import React, { FormEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import Input from './helpers/Input';
import { closePopup } from '../helpers/popup.service';
import { setUserName } from '../helpers/data.service';

const WelcomeHeader = styled.h1``;

export default function WelcomePopup() {
  const [name, setName] = useState('');
  const handleFormSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setUserName(name);
    closePopup();
  }, [name]);

  return (
    <>
      <WelcomeHeader>Добро пожаловать!</WelcomeHeader>
      <p>Давай познакомимся, чтобы ты мог ощутить все возможности этого Трепло.</p>
      <form onSubmit={handleFormSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Как тебя зовут?
          <Input onChange={setName} value={name} />
        </label>
        <button type="submit">Погнали!</button>
      </form>
      <p>
        Заметка: если нужно что-то отредактировать (например, название или описание),
        просто кликни на него мышкой.
      </p>
    </>
  );
}
