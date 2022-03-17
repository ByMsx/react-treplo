import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../state/hooks';
import { selectPopup } from '../../state/popup/selectors';

export default function Popup() {
  const { display, props, component: Component } = useAppSelector(selectPopup);

  return (display && Component) ? (
    <ModalBackdrop>
      <ModalContainer>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </ModalContainer>
    </ModalBackdrop>
  ) : <div />;
}

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
