import { Component, Context, Ref, On } from 'component-decorators';
import whenDefined from 'component-decorators/helpers/whenDefined';

import CompanyData from '../../types/companyData';
import FormElement from '../form';
import RootElement from '../root';
import ButtonElement from '../button';
import '../button';
import '../form';
import '../input';
import storage from '../../utils/storage';

import { validationSchema, initialValues } from './company-data.utils';
import template from './company-data.element.html';
import './company-data.element.scss';

@Component({ selector: 'app-company-data', template })
class CompanyDataElement extends HTMLElement {
  @Context('app-root') $root: RootElement;
  @Ref('app-form') $form: FormElement;
  @Ref('[cancelButton]') $cancelButton: ButtonElement;

  async connectedCallback() {
    const companyData = await storage.getItem('companyData');
    if (companyData) {
      this.$cancelButton.setAttribute('style', '');
    }

    whenDefined('app-form', () => {
      this.$form.init({
        validationSchema,
        initialValues: companyData || initialValues,
        onSubmit: this.onSubmit,
      });
    });
  }

  public onSubmit = async (values: CompanyData) => {
    this.$root.loaderVisible = true;
    await storage.setItem('companyData', values);
    this.$root.state = this.$root.states.MAIN;
  };

  @On('[cancelButton]', 'onclick')
  public onCancel() {
    this.$root.state = this.$root.states.MAIN;
  }
}

export default CompanyDataElement;
