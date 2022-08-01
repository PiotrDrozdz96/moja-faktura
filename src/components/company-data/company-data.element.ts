import { Component, Context, Ref } from 'component-decorators';
import whenDefined from 'component-decorators/helpers/whenDefined';

import CompanyData from '../../types/companyData';
import FormElement from '../form';
import RootElement from '../root/root.element';
import '../form';
import '../input';
import '../button';
import storage from '../../utils/storage';

import { validationSchema, initialValues } from './company-data.utils';
import template from './company-data.element.html';

@Component({ selector: 'app-company-data', template })
class CompanyDataElement extends HTMLElement {
  @Ref('app-form') $form: FormElement;
  @Context('app-root') $root: RootElement;

  connectedCallback() {
    whenDefined('app-form', () => {
      this.$form.init({
        validationSchema,
        initialValues,
        onSubmit: this.onSubmit,
      });
    });
  }

  public onSubmit = async (values: CompanyData) => {
    this.$root.loaderVisible = true;
    await storage.setItem('companyData', values);
    this.$root.state = this.$root.states.INITIAL;
  };
}

export default CompanyDataElement;
