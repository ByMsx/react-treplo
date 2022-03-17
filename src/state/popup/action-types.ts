import { FunctionComponentFactory } from 'react';

export type ShowPopupActionPayload = {
  component: FunctionComponentFactory<any>
  props?: any;
};
