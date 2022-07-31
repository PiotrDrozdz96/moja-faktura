import { Component } from 'component-decorators';

import template from './header.element.html';
import './header.element.scss';

@Component({ selector: 'app-header', template })
class HeaderElement extends HTMLElement {}

export default HeaderElement;
