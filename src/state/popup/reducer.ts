import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FunctionComponentFactory } from 'react';
import { ShowPopupActionPayload } from './action-types';

interface PopupState {
  display: boolean;
  component?: FunctionComponentFactory<any>;
  props?: any;
}

const initialState: PopupState = {
  display: false,
};

const popupSlice = createSlice({
  name: 'popup',
  reducers: {
    showPopup: (state, action: PayloadAction<ShowPopupActionPayload>) => {
      const { component, props } = action.payload;

      state.component = component;
      state.props = props;
      state.display = true;
    },
    hidePopup: (state) => {
      state.display = false;
    },
  },
  initialState,
});

export const { showPopup, hidePopup } = popupSlice.actions;

export default popupSlice.reducer;
