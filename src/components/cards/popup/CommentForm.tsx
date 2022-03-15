import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CommentType } from '../../../types';

export type CommentFormProps = { text?: CommentType['text'], onSubmit: (newText: string) => void };

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

const CommentTextarea = styled.textarea`
  width: 100%;
`;
