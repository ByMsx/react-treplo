import { Card, Column, Comment } from '../types';

const DEFAULT_COLUMNS: Column[] = [{
  id: 1,
  title: 'TODO',
  cards: [{
    id: 1,
    header: 'Create awesome project',
    comments: [],
    author: 'developer',
  }, {
    id: 2,
    header: 'Sale awesome project',
    comments: [],
    author: 'developer',
  }],
}, {
  id: 2,
  title: 'In progress',
  cards: [],
}, {
  id: 3,
  title: 'Testing',
  cards: [],
}, {
  id: 4,
  title: 'Done',
  cards: [],
}];

const defaultState = {
  columns: DEFAULT_COLUMNS,
  id: 10,
};

interface State {
  id: number;
  name?: string;
  columns: Column[];
}

let mutableState: State;
let onUpdateCb: (cols: Column[]) => void;

function getStateFromLocalStorage(): State {
  const json = localStorage.getItem('appState');
  if (!json) {
    throw new Error('LS is empty');
  }

  return JSON.parse(json);
}

// eslint-disable-next-line no-underscore-dangle
function getColumns_(): Column[] {
  let columns;
  try {
    columns = mutableState.columns;
  } catch (e) {
    columns = DEFAULT_COLUMNS;
  }

  return [...columns];
}

function generateNewId(): number {
  mutableState.id += 1;
  return mutableState.id;
}

function commitMutableState() {
  localStorage.setItem('appState', JSON.stringify(mutableState));
  onUpdateCb(getColumns_());
}

export function load() {
  try {
    mutableState = getStateFromLocalStorage();
  } catch (e) {
    mutableState = defaultState;
  }
}

export function setOnUpdate(cb: (cols: Column[]) => void): void {
  onUpdateCb = cb;
}

export function getColumn(columnId: Column['id']): Column {
  const column = mutableState.columns.find((col) => col.id === columnId);
  if (!column) {
    throw new Error('Column not found');
  }

  return column;
}

export function getCard(id: Card['id']): Card {
  const card = mutableState.columns
    .map((col) => col.cards)
    .flat()
    .find((c) => c.id === id);

  if (!card) {
    throw new Error('Card not found');
  }

  return card;
}

export function getColumns(): Column[] {
  return getColumns_();
}

export function setColumnTitle(columnId: Column['id'], title: string) {
  const col = getColumn(columnId);
  col.title = title;

  commitMutableState();
}

export function setCardHeader(cardId: Card['id'], header: string) {
  const card = getCard(cardId);
  card.header = header;

  commitMutableState();
}

export function setCardDescription(cardId: Card['id'], description: string) {
  const card = getCard(cardId);
  card.description = description;

  commitMutableState();
}

export function removeCard(id: Card['id']) {
  let cardIndex = -1;
  const parentColumn = mutableState.columns
    .find((column) => {
      cardIndex = column.cards.findIndex((card) => card.id === id);
      return cardIndex >= 0;
    });

  if (cardIndex >= 0 && parentColumn) {
    parentColumn.cards.splice(cardIndex, 1);
    commitMutableState();
  } else {
    throw new Error('Card not found');
  }
}

export function isUserNameSet(): boolean {
  return !!mutableState.name && mutableState.name.length > 0;
}

export function getUserName(): string {
  if (!mutableState.name) {
    throw new Error('Username is not set');
  }

  return mutableState.name;
}

export function setUserName(name: string): void {
  mutableState.name = name;
  commitMutableState();
}

export function createCard(columnId: Column['id'], cardInfo: Pick<Card, 'header'>) {
  const column = getColumn(columnId);
  column.cards.push({
    ...cardInfo,
    comments: [],
    author: getUserName(),
    id: generateNewId(),
  });

  commitMutableState();
}

export function getComment(commentId: Comment['id']) {
  const foundComment = mutableState.columns
    .map((column) => column.cards)
    .flat()
    .map((card) => card.comments)
    .flat()
    .find((comment) => comment.id === commentId);

  if (!foundComment) {
    throw new Error('Comment not found');
  }

  return foundComment;
}

export function setCommentText(commentId: Comment['id'], newText: Comment['text']) {
  const comment = getComment(commentId);
  comment.text = newText;

  commitMutableState();
}

export function removeComment(commentId: Comment['id']) {
  let commentIdx = -1;
  const parentCard = mutableState.columns
    .map((column) => column.cards)
    .flat()
    .find((card) => {
      commentIdx = card.comments.findIndex((comment) => comment.id === commentId);
      return commentIdx >= 0;
    });

  if (commentIdx >= 0 && parentCard) {
    parentCard.comments.splice(commentIdx, 1);

    commitMutableState();
  } else {
    throw new Error('Comment not found');
  }
}

export function createComment(parentCardId: Card['id'], data: Pick<Comment, 'text'>) {
  const card = getCard(parentCardId);
  card.comments.push({
    author: getUserName(),
    id: generateNewId(),
    ...data,
  });

  commitMutableState();
}
