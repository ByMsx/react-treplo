import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';
import { CommentType } from '../../../../types';

export type CommentFormProps = { text?: CommentType['text'], onSubmit: (newText: string) => void };

export default function CommentForm(props: CommentFormProps) {
  const { text: initialText = '', onSubmit } = props;

  const handleFormSubmit = useCallback((values) => onSubmit(values.text), [onSubmit]);

  return (
    <Form
      onSubmit={handleFormSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Field name="text" initialValue={initialText} render={({ input }) => <CommentTextarea {...input} />} />
          <button type="submit">Сохранить</button>
        </form>
      )}
    />
  );
}

const CommentTextarea = styled.textarea`
  width: 100%;
`;
