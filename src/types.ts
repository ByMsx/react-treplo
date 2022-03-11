export interface Comment {
  id: number;
  text: string;
  author: string;
}

export interface Card {
  id: number;
  header: string;
  comments: Comment[];
  description?: string;
  author: string;
}

export interface Column {
  id: number;
  title: string;
  cards: Card[];
}
