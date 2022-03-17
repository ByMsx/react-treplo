import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { ColumnType } from '../../types';
import { RenameColumnAction } from './action-types';

interface ColumnsState {
  columns: ColumnType[];
}

const initialState: ColumnsState = {
  columns: [{
    id: uuid(),
    title: 'TODO',
  }, {
    id: uuid(),
    title: 'In progress',
  }, {
    id: uuid(),
    title: 'Testing',
  }, {
    id: uuid(),
    title: 'DONE',
  }],
};

const columnsSlice = createSlice({
  initialState,
  name: 'columns',
  reducers: {
    renameColumn: (state, action: PayloadAction<RenameColumnAction>) => {
      const { newTitle, columnId } = action.payload;
      const column = state.columns.find((col) => col.id === columnId);
      if (!column) {
        throw new Error(`Column with id ${columnId} not found`);
      }
      column.title = newTitle;
    },
  },
});

export const { renameColumn } = columnsSlice.actions;

export default columnsSlice.reducer;
