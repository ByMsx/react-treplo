import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../../../types';
import Editable from '../../Editable';
import {
  createComment, removeCard, setCardDescription, setCardHeader,
} from '../../../helpers/data.service';
import { closePopup } from '../../../helpers/popup.service';
import CardComment from './CardComment';
import CommentForm from './CommentForm';
import Author from '../../helpers/Author';

export type CardPopupProps = Card & { columnTitle: string };

const CardHeader = styled.h3`font-size: 2em`;
const CloseButton = styled.button`
  border: 0;
  background: none;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 1.5em;
`;
const CardContent = styled.div`text-align: justify`;

export default function CardPopup(props: CardPopupProps) {
  const {
    id,
    header,
    comments,
    description,
    author,
    columnTitle,
  } = props;

  const [isCreatingComment, setIsCreatingComment] = useState(false);

  const changeCardTitle = useCallback((newTitle: string) => {
    setCardHeader(id, newTitle);
    // TODO: update card in popup
  }, [id]);

  const closePopupClick = useCallback(() => {
    closePopup();
  }, []);

  const removeCardClick = useCallback(() => {
    removeCard(id);
    closePopup();
  }, [id]);

  const handleAddCommentClick = useCallback(() => {
    setIsCreatingComment(true);
  }, [setIsCreatingComment]);

  const setDescription = useCallback((newDescription) => {
    setCardDescription(id, newDescription);
    // TODO: update card in popup
  }, [id]);

  const handleCardChanged = useCallback(() => {
    // TODO: update card in popup
  }, []);

  const createCommentSubmit = useCallback((text: string) => {
    setIsCreatingComment(false);
    createComment(id, { text });
    // TODO: update card in popup
  }, [id, setIsCreatingComment]);

  return (
    <>
      <CardHeader>
        <Editable value={header} onChange={changeCardTitle} />
        <CloseButton onClick={closePopupClick}>&times;</CloseButton>
      </CardHeader>
      <small>{`Столбец: ${columnTitle}`}</small>
      <CardContent>
        <Editable multiline onChange={setDescription} value={description || 'Описание...'} />
      </CardContent>
      <hr />
      <div>
        <button type="button" onClick={removeCardClick}>Удалить</button>
        <Author>{author}</Author>
      </div>
      <h4>Комментарии</h4>
      {comments.map((comment) => (
        <CardComment
          key={comment.id}
          id={comment.id}
          text={comment.text}
          author={comment.author}
          onCardChanged={handleCardChanged}
        />
      ))}
      {isCreatingComment
        ? <CommentForm onSubmit={createCommentSubmit} />
        : <button type="button" onClick={handleAddCommentClick}>Добавить</button>}
    </>
  );
}
