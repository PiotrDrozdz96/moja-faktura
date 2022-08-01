import { Component, Context, Ref, Prop, On } from 'component-decorators';
import whenDefined from 'component-decorators/helpers/whenDefined';

import YourData from '../../types/yourData';
import FormElement from '../form';
import RootElement from '../root/root.element';
import '../form';
import '../input';
import '../button';
import storage from '../../utils/storage';

import { validationSchema, initialValues } from './your-data.utils';
import template from './your-data.element.html';

@Component({ selector: 'app-your-data', template })
class YourDataElement extends HTMLElement {
  @Ref('app-form') $form: FormElement;
  @Context('app-root') $root: RootElement;

  @Prop('input[name="bank_number"]', 'value') bankNumber: string;

  connectedCallback() {
    whenDefined('app-form', () => {
      this.$form.init({
        validationSchema,
        initialValues,
        onSubmit: this.onSubmit,
      });
    });
  }

  @On('input[name="bank_number"]', 'oninput')
  public onBankNumberChange(e: Event) {
    const bankNumberWithoutSpace = (e.target as HTMLInputElement).value.replaceAll(' ', '');
    const [first, second, ...rawValue] = bankNumberWithoutSpace.slice(0, 26);
    const separatorIndex = 4;
    this.bankNumber = new Array(6)
      .fill(1)
      .reduce(
        (acc, _, i) => `${acc} ${rawValue.slice(separatorIndex * i, separatorIndex * (i + 1)).join('')}`,
        `${first || ''}${second || ''}`
      )
      .trim();
  }

  public onSubmit = async (values: YourData) => {
    this.$root.loaderVisible = true;
    await storage.setItem('yourData', values);
    const companyData = await storage.getItem('companyData');

    if (companyData) {
      this.$root.state = this.$root.states.INITIAL;
    } else {
      this.$root.state = this.$root.states.COMPANY_DATA;
    }
  };
}

export default YourDataElement;
