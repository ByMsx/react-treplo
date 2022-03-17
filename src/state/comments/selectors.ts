import { RootState } from '../store';

export const selectCardComments = (cardId: string) => (state: RootState) => state.comments
  .comments.filter((c) => c.cardId === cardId);

export const selectCommentsCountPerCard = (cardIds: string[]) => (state: RootState) => state
  .comments
  .comments
  .filter((comment) => cardIds.includes(comment.cardId))
  .reduce((r, comment) => {
    r[comment.cardId] ??= 0;
    r[comment.cardId] += 1;
    return r;
  }, {} as Record<string, number>);
