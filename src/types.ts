export interface CommentType {
  id: string;
  text: string;
  author: string;
  cardId: string;
}

export interface CardType {
  id: string;
  header: string;
  description?: string;
  author: string;
  columnId: string;
}

export interface ColumnType {
  id: string;
  title: string;
}
