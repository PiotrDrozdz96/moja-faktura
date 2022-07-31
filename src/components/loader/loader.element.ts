import { Component, Ref, Attr, OnAttrChange } from 'component-decorators';

import './loader.element.scss';

@Component({ selector: 'app-loader', template: '<div class="loader"></div>' })
export default class LoaderElement extends HTMLElement {
  @Ref('.loader') $loader: HTMLElement;
  @Attr('visible', 'boolean') visible: boolean;

  connectedCallback() {
    this.style.display = this.visible ? 'flex' : 'none';
  }

  @OnAttrChange('visible')
  onChangeVisibility(visible) {
    this.style.display = visible !== null ? 'flex' : 'none';
  }
}
