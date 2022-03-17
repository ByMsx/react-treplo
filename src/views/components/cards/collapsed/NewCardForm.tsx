import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';
import CardBodyContainer from './CardBodyContainer';
import { CardType } from '../../../../types';

export type NewCardFormProps = {
  onCreate: (v: Pick<CardType, 'header'>) => void;
};

export default function NewCardForm(props: NewCardFormProps) {
  const { onCreate } = props;

  const handleFormSubmit = useCallback((values) => {
    onCreate(values);
  }, [onCreate]);

  const handleValidate = useCallback((values) => {
    if (!values.header) {
      return {
        header: {
          required: 'header',
        },
      };
    }

    return {};
  }, []);

  return (
    <CardBodyContainer>
      <Form
        onSubmit={handleFormSubmit}
        validate={handleValidate}
        render={({ handleSubmit, errors, touched }) => (
          <FormContainer onSubmit={handleSubmit}>
            <Field name="header" component="input" />
            <button type="submit">Создать карточку</button>
            <Errors>{touched?.header && errors?.header?.required && 'Поле не может быть пустым'}</Errors>
          </FormContainer>
        )}
      />
    </CardBodyContainer>
  );
}

const FormContainer = styled.form`
  display: block;
  margin-top: 2em;
`;

const Errors = styled.small`color: red;`;
