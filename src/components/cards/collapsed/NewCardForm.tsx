import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Input from '../../helpers/Input';
import CardBodyContainer from './CardBodyContainer';
import { CardType } from '../../../types';

export type NewCardFormProps = {
  onCreate: (v: Pick<CardType, 'header'>) => void;
};

export default function NewCardForm(props: NewCardFormProps) {
  const { onCreate } = props;

  const [header, setHeader] = useState('');

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    onCreate({
      header,
    });
  }, [header, onCreate]);

  return (
    <CardBodyContainer>
      <Form onSubmit={handleFormSubmit}>
        <Input value={header} onChange={setHeader} />
        <button type="submit">Создать карточку</button>
      </Form>
    </CardBodyContainer>
  );
}

const Form = styled.form`
  display: block;
  margin-top: 2em;
`;
