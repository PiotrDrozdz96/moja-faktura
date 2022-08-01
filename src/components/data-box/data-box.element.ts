import { Component, Attr, OnAttrChange, Ref, Context, On } from 'component-decorators';
import createHtmlTemplate from 'component-decorators/helpers/createHtmlTemplate';

import CompanyData from '../../types/companyData';
import YourData from '../../types/yourData';
import RootElement, { RootState } from '../root';

import template from './data-box.element.html';
import content from './data-box.content.html';
import './data-box.element.scss';

@Component({ selector: 'app-data-box', template })
class MainElement extends HTMLElement {
  @Attr('root-state') rootState: RootState;
  @Attr('data', 'json') data: CompanyData | YourData;

  @Context('app-root') $root: RootElement;
  @Ref('.box') $box: HTMLDivElement;

  @OnAttrChange('data')
  public rerender() {
    const htmlTemplate = createHtmlTemplate(content);
    this.$box.innerHTML = htmlTemplate(this);
  }

  @On('.button', 'onclick')
  public onEdit() {
    this.$root.state = this.rootState;
  }
}

export default MainElement;
