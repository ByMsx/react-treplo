import { Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';

export default function authorMiddleware(mwApi: MiddlewareAPI) {
  return (next: Dispatch): Dispatch => (action) => {
    if (
      action.type === 'cards/createCard'
      || action.type === 'comments/createComment'
    ) {
      const author = mwApi.getState().user?.name || 'developer';

      return next({
        ...action,
        payload: {
          ...action.payload,
          author,
        },
      });
    }

    return next(action);
  };
}
