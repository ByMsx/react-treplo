import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CardType } from '../../../types';
import Editable from '../../Editable';
import {
  createComment, removeCard, setCardDescription, setCardHeader,
} from '../../../helpers/data.service';
import { closePopup } from '../../../helpers/popup.service';
import CardComment from './CardComment';
import CommentForm from './CommentForm';
import Author from '../../helpers/Author';

export type CardPopupProps = { card: CardType, columnTitle: string };

export default function CardPopup(props: CardPopupProps) {
  const {
    card: {
      id,
      header,
      comments,
      description,
      author,
    },
    columnTitle,
  } = props;

  const [isCreatingComment, setIsCreatingComment] = useState(false);

  const handleHeaderChange = useCallback((newTitle: string) => {
    setCardHeader(id, newTitle);
  }, [id]);

  const handleClose = useCallback(() => {
    closePopup();
  }, []);

  const handleCardRemoveClick = useCallback(() => {
    removeCard(id);
    closePopup();
  }, [id]);

  const handleAddCommentClick = useCallback(() => {
    setIsCreatingComment(true);
  }, [setIsCreatingComment]);

  const handleDescriptionChange = useCallback((newDescription) => {
    setCardDescription(id, newDescription);
  }, [id]);

  const handleCommentFormSubmit = useCallback((text: string) => {
    setIsCreatingComment(false);
    createComment(id, { text });
  }, [id, setIsCreatingComment]);

  return (
    <>
      <CardHeader>
        <Editable value={header} onChange={handleHeaderChange} />
        <CloseButton onClick={handleClose}>&times;</CloseButton>
      </CardHeader>
      <small>{`Столбец: ${columnTitle}`}</small>
      <CardContent>
        <Editable multiline onChange={handleDescriptionChange} value={description || 'Описание... (нажмите тут, чтобы отредактировать описание)'} />
      </CardContent>
      <hr />
      <div>
        <button type="button" onClick={handleCardRemoveClick}>Удалить карточку</button>
        <Author>{author}</Author>
      </div>
      <h4>Комментарии</h4>
      {comments.map((comment) => (
        <CardComment
          key={comment.id}
          comment={comment}
        />
      ))}
      {isCreatingComment
        ? <CommentForm onSubmit={handleCommentFormSubmit} />
        : <button type="button" onClick={handleAddCommentClick}>Добавить</button>}
    </>
  );
}

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
