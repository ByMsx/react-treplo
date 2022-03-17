import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { CardType } from '../../types';
import { CreateCardPayload, RemoveCardPayload, UpdateCardPayload } from './action-types';

interface CardsState {
  cards: CardType[];
}

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    createCard: (state, action: PayloadAction<CreateCardPayload>) => {
      state.cards.push({
        ...action.payload,
        id: uuid(),
      });
    },
    updateCard: (state, action: PayloadAction<UpdateCardPayload>) => {
      const { id } = action.payload;
      const card = state.cards.find((c) => c.id === id);
      if (!card) {
        throw new Error(`Card with id=${id} not found`);
      }
      Object.assign(card, action.payload);
    },
    removeCard: (state, action: PayloadAction<RemoveCardPayload>) => {
      const id = action.payload;
      const idx = state.cards.findIndex((card) => card.id === id);
      if (idx < 0) {
        throw new Error(`Card with id=${id} not found`);
      }
      state.cards.splice(idx);
    },
  },
});

export const { createCard, updateCard, removeCard } = cardsSlice.actions;

export default cardsSlice.reducer;
