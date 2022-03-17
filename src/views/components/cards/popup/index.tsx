import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Editable from '../../Editable';
import CardComment from './CardComment';
import CommentForm from './CommentForm';
import Author from '../../helpers/Author';
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import { selectCardById } from '../../../../state/cards/selectors';
import { selectCardComments } from '../../../../state/comments/selectors';
import { selectColumnById } from '../../../../state/columns/selectors';
import { removeCard, updateCard } from '../../../../state/cards/reducer';
import { createComment } from '../../../../state/comments/reducer';
import { hidePopup } from '../../../../state/popup/reducer';

export type CardPopupProps = { id: string };

export default function CardPopup(props: CardPopupProps) {
  const { id } = props;
  const card = useAppSelector(selectCardById(id));
  const comments = useAppSelector(selectCardComments(id));
  const column = card ? useAppSelector(selectColumnById(card.columnId)) : null;
  const dispatch = useAppDispatch();

  const [isCreatingComment, setIsCreatingComment] = useState(false);

  const handleHeaderChange = useCallback((header: string) => {
    dispatch(updateCard({ id, header }));
  }, [id, dispatch]);

  const handleClose = useCallback(() => {
    dispatch(hidePopup());
  }, [dispatch]);

  const handleCardRemoveClick = useCallback(() => {
    dispatch(removeCard(id));
    dispatch(hidePopup());
  }, [id, dispatch]);

  const handleAddCommentClick = useCallback(() => {
    setIsCreatingComment(true);
  }, [setIsCreatingComment]);

  const handleDescriptionChange = useCallback((description) => {
    dispatch(updateCard({ id, description }));
  }, [id, dispatch]);

  const handleCommentFormSubmit = useCallback((text: string) => {
    setIsCreatingComment(false);
    dispatch(createComment({ author: '', cardId: id, text }));
  }, [id, setIsCreatingComment, dispatch]);

  return card ? (
    <>
      <CardHeader>
        <Editable value={card.header} onChange={handleHeaderChange} />
        <CloseButton onClick={handleClose}>&times;</CloseButton>
      </CardHeader>
      <small>{`Столбец: ${column?.title}`}</small>
      <CardContent>
        <Editable multiline onChange={handleDescriptionChange} value={card.description || 'Описание... (нажмите тут, чтобы отредактировать описание)'} />
      </CardContent>
      <hr />
      <div>
        <button type="button" onClick={handleCardRemoveClick}>Удалить карточку</button>
        <Author>{card.author}</Author>
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
  ) : (
    <p>Карточка не найдена</p>
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
