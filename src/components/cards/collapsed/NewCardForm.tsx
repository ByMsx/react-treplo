import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import * as Data from '../../../types';
import Input from '../../helpers/Input';
import CardBodyContainer from './CardBodyContainer';

export type NewCardFormProps = {
  onCreateCard: (v: Pick<Data.Card, 'header'>) => void;
};

const Form = styled.form`
  display: block;
  margin-top: 2em;
`;

export default function NewCardForm(props: NewCardFormProps) {
  const { onCreateCard } = props;

  const [header, setHeader] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    onCreateCard({
      header,
    });
  }, [header, onCreateCard]);

  return (
    <CardBodyContainer>
      <Form onSubmit={handleSubmit}>
        <Input value={header} onChange={setHeader} />
        <button type="submit">Создать карточку</button>
      </Form>
    </CardBodyContainer>
  );
}
