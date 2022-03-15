import React, { useCallback, useState } from 'react';
import { CommentType } from '../../../types';
import CommentForm from './CommentForm';
import { removeComment, setCommentText } from '../../../helpers/data.service';
import Author from '../../helpers/Author';

export type CardCommentProps = { comment: CommentType };

export default function CardComment(props: CardCommentProps) {
  const {
    comment: { id, text, author },
  } = props;
  const [isCommentEditing, setIsCommentEditing] = useState(false);

  const handleCommentRemoveClick = useCallback(() => {
    removeComment(id);
  }, [id]);

  const handleCommentChangeClick = useCallback(() => {
    setIsCommentEditing(true);
  }, [setIsCommentEditing]);

  const handleCommentChange = useCallback((newText: string) => {
    setIsCommentEditing(false);
    setCommentText(id, newText);
  }, [id, setIsCommentEditing]);

  return (
    <div>
      {!isCommentEditing
        ? (
          <>
            {text}
            <Author>{author}</Author>
            <hr />
            <div>
              <button type="button" onClick={handleCommentChangeClick}>Изменить комментарий</button>
              <button type="button" onClick={handleCommentRemoveClick}>Удалить комментарий</button>
            </div>
          </>
        ) : (
          <CommentForm onSubmit={handleCommentChange} text={text} />
        )}
    </div>
  );
}
