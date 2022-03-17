import React, { useCallback, useState } from 'react';
import { CommentType } from '../../../../types';
import CommentForm from './CommentForm';
import Author from '../../helpers/Author';
import { useAppDispatch } from '../../../../state/hooks';
import { removeComment, updateComment } from '../../../../state/comments/reducer';

export type CardCommentProps = { comment: CommentType };

export default function CardComment(props: CardCommentProps) {
  const {
    comment: { id, text, author },
  } = props;
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleCommentRemoveClick = useCallback(() => {
    dispatch(removeComment(id));
  }, [id, dispatch]);

  const handleCommentChangeClick = useCallback(() => {
    setIsCommentEditing(true);
  }, [setIsCommentEditing]);

  const handleCommentChange = useCallback((newText: string) => {
    setIsCommentEditing(false);
    dispatch(updateComment({ id, text: newText }));
  }, [id, dispatch, setIsCommentEditing]);

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
