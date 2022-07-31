import { Component } from 'component-decorators';

import '../input';

import template from './your-data.element.html';

@Component({ selector: 'app-your-data', template })
class YourDataElement extends HTMLElement {}

export default YourDataElement;
