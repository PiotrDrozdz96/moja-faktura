import { Component, Prop, Context, Ref, On } from 'component-decorators';
import whenDefined from 'component-decorators/helpers/whenDefined';
import createHtmlTemplate from 'component-decorators/helpers/createHtmlTemplate';
import _omit from 'lodash/omit';

import CompanyData from '../../types/companyData';
import YourData from '../../types/yourData';
import MainData from '../../types/mainData';
import storage from '../../utils/storage';
import RootElement from '../root';
import FormElement from '../form';
import '../data-box';

import invoice from './invoice.xml';
import { validationSchema } from './main.utils';
import template from './main.element.html';
import './main.element.scss';

@Component({ selector: 'app-main', template })
class MainElement extends HTMLElement {
  @Context('app-root') $root: RootElement;
  @Prop('[yourData]', 'data') yourData: YourData;
  @Prop('[companyData]', 'data') companyData: CompanyData;
  @Prop('input[name="amount"]', 'value') amount: string;

  @Ref('app-form') $form: FormElement;

  get rootStates() {
    return this.$root.states;
  }

  async connectedCallback() {
    this.$root.loaderVisible = true;
    this.yourData = await storage.getItem('yourData');
    this.companyData = await storage.getItem('companyData');
    this.$root.loaderVisible = false;

    const mainData = await storage.getItem('mainData');

    whenDefined('app-form', () => {
      this.$form.init({
        validationSchema,
        initialValues: {
          date: new Date().toISOString().split('T')[0],
          issuer: mainData?.issuer || '',
          amount: mainData?.amount || '',
        },
        onSubmit: (values: MainData) => this.onSubmit(values),
      });
    });
  }

  public async onSubmit(values: MainData) {
    await storage.setItem('mainData', _omit(values, ['date']));
    const invoiceTemplate = createHtmlTemplate(invoice);

    const [year, month, day] = values.date.split('-');
    const deadlineDate = new Date(values.date);
    deadlineDate.setDate(15);
    const [deadlineDateWithoutTime] = deadlineDate.toISOString().split('T');
    const [deadlineYear, deadlineMonth] = deadlineDateWithoutTime.split('-');

    const invoiceData = {
      yourData: this.yourData,
      companyData: this.companyData,
      invoice_number: [month, year].join('/'),
      amount: values.amount,
      issuer: values.issuer,
      date: [day, month, year].join('.'),
      payment_deadline: [14, deadlineMonth, deadlineYear].join('.'),
    };

    Word.run(async (context) => {
      const invoiceRange = context.document.body.insertOoxml(invoiceTemplate(invoiceData), Word.InsertLocation.replace);
      context.load(invoiceRange.paragraphs, 'spaceAfter');
      await context.sync();
      invoiceRange.paragraphs.items.forEach((paragraph) => (paragraph.spaceAfter = 0));

      await context.sync();
    });
  }

  @On('input[name="amount"]', 'onchange')
  public amountFormatter(e) {
    const value = (e.target as HTMLInputElement).value;
    let formattedValue = value.replace(/\s/g, '');
    formattedValue = formattedValue.replace(/\./g, ',');
    const [mainValue, secondValue] = formattedValue.split(',');
    const formattedSecondValue = `${secondValue || ''}00`.substring(0, 2);

    this.amount = `${mainValue.substring(0, mainValue.length - 3)} ${mainValue.substring(
      mainValue.length - 3
    )},${formattedSecondValue}`;
  }
}

export default MainElement;
