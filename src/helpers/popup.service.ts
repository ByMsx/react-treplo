import React from 'react';

export interface PopupInfo<P> {
  fn: React.FunctionComponentFactory<P>;
  props: P;
}

let popupOpenedCallback: () => void;
let popupClosedCallback: () => void;

let popupInfo: PopupInfo<any> | null;
export function openPopup<P>(fn: React.FunctionComponentFactory<P>, props: P) {
  popupInfo = {
    fn,
    props,
  };

  popupOpenedCallback();
}

export function getPopupInfo() {
  return popupInfo;
}

export function setPopupOpenedCallback(cb: () => void) {
  popupOpenedCallback = cb;
}

export function setPopupClosedCallback(cb: () => void) {
  popupClosedCallback = cb;
}

export function closePopup() {
  if (popupInfo) {
    popupInfo = null;
    popupClosedCallback();
  }
}
