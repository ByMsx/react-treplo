import { configureStore } from '@reduxjs/toolkit';
import columns from './columns/reducer';
import cards from './cards/reducer';
import comments from './comments/reducer';
import user from './user/reducer';
import popup from './popup/reducer';

import authorMiddleware from './author.middleware';

const store = configureStore({
  reducer: {
    columns,
    cards,
    comments,
    popup,
    user,
  },
  middleware: [authorMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
