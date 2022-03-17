import { RootState } from '../store';

export const selectColumnCards = (columnId: string) => (state: RootState) => state.cards
  .cards.filter((c) => c.columnId === columnId);

export const selectCardById = (cardId: string) => (state: RootState) => state.cards
  .cards.find((c) => c.id === cardId);
