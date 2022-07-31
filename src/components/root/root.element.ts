import { Component, State } from 'component-decorators';
import 'component-decorators/directivities/web-switch';

import '../loader';

import template from './root.element.html';
import './root.element.scss';

const rootStates = {
  OUTSIDE: 'outside',
  INITIAL: 'initial',
} as const;

type RootState = typeof rootStates[keyof typeof rootStates];

@Component({ selector: 'app-root', template })
class RootElement extends HTMLElement {
  readonly states = rootStates;

  @State('app-loader.visible') loaderVisible: boolean;
  @State('web-switch.state') state: RootState = rootStates.OUTSIDE;

  connectedCallback() {
    Office.onReady((info) => {
      this.loaderVisible = false;
      if (info.host === Office.HostType.Word) {
        this.state = this.states.INITIAL;
      }
    });
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

export default RootElement;
