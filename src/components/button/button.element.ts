import { Component, Attr } from 'component-decorators';

import template from './button.element.html';
import './button.element.scss';

@Component({ selector: 'app-button', template })
class ButtonElement extends HTMLElement {
  @Attr('type', 'string') type: 'button' | 'submit' | 'reset';
}

export default ButtonElement;
