import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  getPopupInfo, PopupInfo, setPopupClosedCallback, setPopupOpenedCallback,
} from '../helpers/popup.service';

const ModalBackdrop = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  background-color: #282c34AA;
`;
const ModalContainer = styled.div`
  background-color: #ECECEC;
  border-radius: 1em;
  min-height: 10em;
  width: 50%;
  margin: 3em auto;
  padding: 1em;
  position: relative;
`;

export default function Popup() {
  const [popupInfo, setPopupInfo] = useState<PopupInfo<any> | null>();
  const onPopupOpened = useCallback(() => {
    const info = getPopupInfo();
    setPopupInfo(info);
  }, [setPopupInfo]);

  const onPopupClosed = useCallback(() => {
    setPopupInfo(null);
  }, [setPopupInfo]);

  setPopupOpenedCallback(onPopupOpened);
  setPopupClosedCallback(onPopupClosed);

  return popupInfo ? (
    <ModalBackdrop>
      <ModalContainer>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <popupInfo.fn {...popupInfo.props} />
      </ModalContainer>
    </ModalBackdrop>
  ) : <div />;
}
