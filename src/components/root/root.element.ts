import { Component, State } from 'component-decorators';
import 'component-decorators/directivities/web-switch';

import storage from '../../utils/storage';
import '../loader';
import '../your-data';
import '../company-data';
import '../main';

import template from './root.element.html';
import './root.element.scss';

const rootStates = {
  OUTSIDE: 'outside',
  YOUR_DATA: 'yourData',
  COMPANY_DATA: 'companyData',
  MAIN: 'main',
} as const;

export type RootState = typeof rootStates[keyof typeof rootStates];

@Component({ selector: 'app-root', template })
class RootElement extends HTMLElement {
  readonly states = rootStates;

  @State('app-loader.visible') loaderVisible: boolean;
  @State('web-switch.state', { 'app-loader.visible': () => false }) state: RootState = rootStates.OUTSIDE;

  connectedCallback() {
    this.loaderVisible = true;
    Office.onReady(async (info) => {
      if (info.host === Office.HostType.Word) {
        const yourData = await storage.getItem('yourData');
        const companyData = await storage.getItem('companyData');
        if (!yourData) {
          this.state = this.states.YOUR_DATA;
        } else if (!companyData) {
          this.state = this.states.COMPANY_DATA;
        } else {
          this.state = this.states.MAIN;
        }
      }
    });
  }
}

export default RootElement;
