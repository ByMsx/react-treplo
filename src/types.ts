export interface CommentType {
  id: number;
  text: string;
  author: string;
}

export interface CardType {
  id: number;
  header: string;
  comments: CommentType[];
  description?: string;
  author: string;
}

export interface ColumnType {
  id: number;
  title: string;
  cards: CardType[];
}
