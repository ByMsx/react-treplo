import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetUserNamePayload } from './action-types';

interface UserState {
  name?: string;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<SetUserNamePayload>) => {
      state.name = action.payload;
    },
  },
});

export const { setUserName } = userSlice.actions;

export default userSlice.reducer;
