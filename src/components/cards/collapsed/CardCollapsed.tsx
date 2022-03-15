import React, { useCallback } from 'react';
import styled from 'styled-components';
import CardBodyContainer from './CardBodyContainer';
import { openPopup } from '../../../helpers/popup.service';
import CardPopup from '../popup';
import Author from '../../helpers/Author';
import { CardType } from '../../../types';

// used at ../popup/index.tsx:33
// eslint-disable-next-line react/no-unused-prop-types
export type CardProps = { card: CardType, columnTitle: string };

export default function CardCollapsed(props: CardProps) {
  const { card: { header, comments, author } } = props;
  const commentsCount = comments?.length;

  const handleCardBodyClick = useCallback(() => {
    openPopup(CardPopup, props);
  }, [props]);

  return (
    <CardBodyContainer onClick={handleCardBodyClick}>
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

const Title = styled.h3``;
const Icons = styled.div`display: inline-block; width: 50%; text-align: left;`;
const AuthorWrapper = styled.div`display: inline-block; width: 50%`;
