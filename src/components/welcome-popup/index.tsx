import React, { FormEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import Input from '../helpers/Input';
import { closePopup } from '../../helpers/popup.service';
import { setUserName } from '../../helpers/data.service';
import css from './WelcomePopup.module.css';

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
        <label htmlFor="nameInput">Как тебя зовут?</label>
        <Input className={css.inputWithMl} id="nameInput" onChange={setName} value={name} />
        <button type="submit">Погнали!</button>
      </form>
      <p>
        Заметка: если нужно что-то отредактировать (например, название или описание),
        просто кликни на него мышкой.
      </p>
    </>
  );
}

const WelcomeHeader = styled.h1``;
