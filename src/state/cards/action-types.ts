import { CardType } from '../../types';

export type CreateCardPayload = Pick<CardType, 'header' | 'columnId' | 'author'>;

export type UpdateCardPayload = Pick<CardType, 'id'> & Partial<CardType>;

export type RemoveCardPayload = CardType['id'];
