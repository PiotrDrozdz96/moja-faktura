import { Component, Prop, Context } from 'component-decorators';
import CompanyData from 'src/types/companyData';
import YourData from 'src/types/yourData';

import storage from '../../utils/storage';
import RootElement from '../root';
import '../data-box';

import template from './main.element.html';
import './main.element.scss';

@Component({ selector: 'app-main', template })
class MainElement extends HTMLElement {
  @Context('app-root') $root: RootElement;
  @Prop('[yourData]', 'data') yourData: YourData;
  @Prop('[companyData]', 'data') companyData: CompanyData;

  get rootStates() {
    return this.$root.states;
  }

  async connectedCallback() {
    this.$root.loaderVisible = true;
    this.yourData = await storage.getItem('yourData');
    this.companyData = await storage.getItem('companyData');
    this.$root.loaderVisible = false;
  }

  // @On('button', 'click')
  // async run() {
  //   return Word.run(async (context) => {
  //     const invoiceRange = context.document.body.insertOoxml(template, Word.InsertLocation.replace);
  //     context.load(invoiceRange.paragraphs, 'spaceAfter');
  //     await context.sync();
  //     invoiceRange.paragraphs.items.forEach((paragraph) => (paragraph.spaceAfter = 0));

  //     await context.sync();
  //   });
  // }
}

export default MainElement;
