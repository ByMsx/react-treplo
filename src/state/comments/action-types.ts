import { CommentType } from '../../types';

export type CreateCommentPayload = Pick<CommentType, 'text' | 'cardId' | 'author'>;

export type UpdateCommentPayload = Pick<CommentType, 'id'> & Partial<CommentType>;

export type RemoveCommentPayload = CommentType['id'];
