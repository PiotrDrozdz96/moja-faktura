import { Component, Attr, Ref, Prop, OnAttrChange } from 'component-decorators';
import _isFunction from 'lodash/isFunction';

import template from './input.element.html';
import './input.element.scss';

type ValidateFunction = (this: HTMLInputElement, ev: FocusEvent) => void;

@Component({ selector: 'app-input', template })
class InputElement extends HTMLElement {
  @Attr('name') name: string;
  @Attr('label') label: string;
  @Prop('input', 'value') value: string;

  @Ref('input') $input: HTMLInputElement;
  @Ref('.error-message') $errorMessage: HTMLElement;

  private _validate: ValidateFunction;

  set validate(validate: (value: any) => void) {
    if (_isFunction(this._validate)) {
      this.$input.removeEventListener('focusout', this._validate);
    }

    this._validate = () => {
      validate(this.value);
    };
    this.$input.addEventListener('focusout', this._validate);
  }

  @OnAttrChange('error')
  public onErrorChange(error) {
    this.$errorMessage.style.display = error ? 'block' : 'none';
    this.$errorMessage.innerHTML = error;
  }
}

export default InputElement;
