import { Component, Attr } from 'component-decorators';

import template from './input.element.html';

@Component({ selector: 'app-input', template })
class InputElement extends HTMLElement {
  @Attr('label') label: string;
}

export default InputElement;
