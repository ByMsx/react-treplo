import React, { useCallback } from 'react';
import styled from 'styled-components';
import * as Data from '../../../types';
import CardBodyContainer from './CardBodyContainer';
import { openPopup } from '../../../helpers/popup.service';
import CardPopup from '../popup';
import Author from '../../helpers/Author';

// used at ../popup/index.tsx:33
// eslint-disable-next-line react/no-unused-prop-types
export type CardProps = { card: Data.Card, columnTitle: string };

const Title = styled.h3``;
const Icons = styled.div`display: inline-block; width: 50%; text-align: left;`;
const AuthorWrapper = styled.div`display: inline-block; width: 50%`;

export default function CardCollapsed(props: CardProps) {
  const { card: { header, comments, author } } = props;
  const commentsCount = comments?.length;

  const openCardModal = useCallback(() => {
    openPopup(CardPopup, props);
  }, [props]);

  return (
    <CardBodyContainer onClick={openCardModal}>
      <Title>{header}</Title>
      <div>
        <Icons>
          {`${commentsCount} 🗯`}
        </Icons>
        <AuthorWrapper>
          <Author>{author}</Author>
        </AuthorWrapper>
      </div>
    </CardBodyContainer>
  );
}
