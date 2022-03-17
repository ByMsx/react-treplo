import React, { useCallback } from 'react';
import styled from 'styled-components';
import CardBodyContainer from './CardBodyContainer';
import CardPopup from '../popup';
import Author from '../../helpers/Author';
import { showPopup } from '../../../../state/popup/reducer';
import { useAppDispatch } from '../../../../state/hooks';

export type CardProps = { id: string, header: string, author: string, commentsCount: number };

export default function CardCollapsed(props: CardProps) {
  const {
    id, header, author, commentsCount,
  } = props;
  const dispatch = useAppDispatch();

  const handleCardBodyClick = useCallback(() => {
    dispatch(showPopup({
      component: CardPopup,
      props: { id },
    }));
  }, [id, dispatch]);

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
