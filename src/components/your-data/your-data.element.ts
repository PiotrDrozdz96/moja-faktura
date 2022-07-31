import { Component, Ref } from 'component-decorators';
import whenDefined from 'component-decorators/helpers/whenDefined';

import YourData from '../../types/yourData';
import FormElement from '../form';
import '../form';
import '../input';
import '../button';

import { validationSchema, initialValues } from './your-data.utils';
import template from './your-data.element.html';

@Component({ selector: 'app-your-data', template })
class YourDataElement extends HTMLElement {
  @Ref('app-form') $form: FormElement;

  connectedCallback() {
    whenDefined('app-form', () => {
      this.$form.init({
        validationSchema,
        initialValues,
        onSubmit: this.onSubmit,
      });
    });
  }

  public onSubmit = (values: YourData) => {
    console.log(values);
  };
}

export default YourDataElement;
