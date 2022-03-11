import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Comment } from '../../../types';

const CommentTextarea = styled.textarea`
  width: 100%;
`;

export type CommentFormProps = Partial<Omit<Comment, 'id'>> & { onSubmit: (newText: string) => void };

export default function CommentForm(props: CommentFormProps) {
  const { text: initialText = '', onSubmit } = props;
  const [text, setText] = useState(initialText);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    onSubmit(text);
  }, [text, onSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      <CommentTextarea onChange={(e) => setText(e.target.value)} />
      <button type="submit">Сохранить</button>
    </form>
  );
}
