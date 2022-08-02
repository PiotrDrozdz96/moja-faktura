import { Component, Prop, Context, Ref, On } from 'component-decorators';
import whenDefined from 'component-decorators/helpers/whenDefined';
import _omit from 'lodash/omit';

import CompanyData from '../../types/companyData';
import YourData from '../../types/yourData';
import MainData from '../../types/mainData';
import storage from '../../utils/storage';
import RootElement from '../root';
import FormElement from '../form';
import '../data-box';

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
        onSubmit: this.onSubmit,
      });
    });
  }

  public async onSubmit(values: MainData) {
    await storage.setItem('mainData', _omit(values, ['date']));
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

  // @On('button', 'click')
  // async run() {
  //   return Word.run(async (context) => {
  //     const invoiceRange = context.document.body.insertOoxml(template, Word.InsertLocation.replace);
  //     context.load(invoiceRange.paragraphs, 'spaceAfter');
  //     await context.sync();
  //     invoiceRange.paragraphs.items.forEach((paragraph) => (paragraph.spaceAfter = 0));

  //     await context.sync();
  //   });
  // }
}

export default MainElement;
