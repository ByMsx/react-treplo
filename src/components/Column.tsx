import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import CardCollapsed from './cards/collapsed/CardCollapsed';
import Editable from './Editable';
import * as DataService from '../helpers/data.service';
import NewCardForm from './cards/collapsed/NewCardForm';
import { CardType, ColumnType } from '../types';

export type ColumnProps = ColumnType;

export default function Column(props: ColumnProps) {
  const { id, title, cards } = props;

  const [isCreatingNewCard, setIsCreatingNewCard] = useState(false);

  const handleTitleChange = useCallback((newTitle) => {
    DataService.setColumnTitle(id, newTitle);
  }, [id]);

  const handleCardCreate = useCallback((cardInfo: Pick<CardType, 'header'>) => {
    DataService.createCard(id, cardInfo);
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
            card={card}
            columnTitle={title}
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
