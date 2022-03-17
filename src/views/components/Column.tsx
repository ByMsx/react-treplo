import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import CardCollapsed from './cards/collapsed/CardCollapsed';
import Editable from './Editable';
import NewCardForm from './cards/collapsed/NewCardForm';
import { CardType, ColumnType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { renameColumn } from '../../state/columns/reducer';
import { selectColumnCards } from '../../state/cards/selectors';
import { createCard } from '../../state/cards/reducer';
import { selectCommentsCountPerCard } from '../../state/comments/selectors';

export type ColumnProps = ColumnType;

export default function Column(props: ColumnProps) {
  const { id, title } = props;
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectColumnCards(id));
  const cardsIds = cards.map((card) => card.id);
  const commentsCounts = useAppSelector(selectCommentsCountPerCard(cardsIds));

  const [isCreatingNewCard, setIsCreatingNewCard] = useState(false);

  const handleTitleChange = useCallback((newTitle) => {
    dispatch(renameColumn({ columnId: id, newTitle }));
  }, [id]);

  const handleCardCreate = useCallback((cardInfo: Pick<CardType, 'header'>) => {
    dispatch(createCard({
      columnId: id,
      author: '',
      ...cardInfo,
    }));

    setIsCreatingNewCard(false);
  }, [id, setIsCreatingNewCard]);

  return (
    <ColumnBody>
      <CardHeader>
        <Editable value={title} onChange={handleTitleChange} />
      </CardHeader>
      <CardsContainer>
        {cards.map((card) => (
          <CardCollapsed
            key={card.id}
            id={card.id}
            author={card.author}
            header={card.header}
            commentsCount={commentsCounts[card.id] || 0}
          />
        ))}
        {!isCreatingNewCard ? (
          <button type="button" onClick={() => setIsCreatingNewCard(true)}>Добавить</button>
        ) : (
          <NewCardForm onCreate={handleCardCreate} />
        )}
      </CardsContainer>
    </ColumnBody>
  );
}

const CardHeader = styled.h2`
  border-bottom: 1px solid grey;
  padding-bottom: 1em;
`;

const ColumnBody = styled.div`
  width: 20em;
  background-color: #ececec;
  border-radius: 1em;
  border: 1px solid grey;
`;

const CardsContainer = styled.div`
  background-color: #ECECEC;
  padding: 0.3em 0.5em 0.3em;
  border-radius: 1em;
`;
