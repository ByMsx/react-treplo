import { RootState } from '../store';

export const selectColumns = (state: RootState) => state.columns;

export const selectColumnById = (id: string) => (state: RootState) => state.columns
  .columns.find((col) => col.id === id);
