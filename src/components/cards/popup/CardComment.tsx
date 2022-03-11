import React, { useCallback, useState } from 'react';
import { Comment } from '../../../types';
import CommentForm from './CommentForm';
import { removeComment, setCommentText } from '../../../helpers/data.service';
import Author from '../../helpers/Author';

export type CardCommentProps = Comment & { onCardChanged: () => void };

export default function CardComment(props: CardCommentProps) {
  const {
    id, text, onCardChanged, author,
  } = props;
  const [isCommentEditing, setIsCommentEditing] = useState(false);

  const removeCommentClick = useCallback(() => {
    removeComment(id);
  }, [id]);

  const changeCommentClick = useCallback(() => {
    setIsCommentEditing(true);
  }, [setIsCommentEditing]);

  const handleCommentChange = useCallback((newText: string) => {
    setIsCommentEditing(false);
    setCommentText(id, newText);
    onCardChanged();
  }, [id, onCardChanged, setIsCommentEditing]);

  return (
    <div>
      {!isCommentEditing
        ? (
          <>
            {text}
            <Author>{author}</Author>
            <hr />
            <div>
              <button type="button" onClick={changeCommentClick}>Изменить</button>
              <button type="button" onClick={removeCommentClick}>Удалить</button>
            </div>
          </>
        ) : (
          <CommentForm onSubmit={handleCommentChange} text={text} />
        )}
    </div>
  );
}
