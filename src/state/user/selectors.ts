import { RootState } from '../store';

// eslint-disable-next-line import/prefer-default-export
export const selectUsername = (state: RootState) => state.user.name;
