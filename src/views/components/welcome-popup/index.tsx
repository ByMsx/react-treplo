import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';
import css from './WelcomePopup.module.css';
import { useAppDispatch } from '../../../state/hooks';
import { setUserName } from '../../../state/user/reducer';
import { hidePopup } from '../../../state/popup/reducer';

export default function WelcomePopup() {
  const dispatch = useAppDispatch();

  const handleFormSubmit = useCallback(({ name }) => {
    dispatch(setUserName(name));
    dispatch(hidePopup());
  }, [dispatch]);

  return (
    <>
      <WelcomeHeader>Добро пожаловать!</WelcomeHeader>
      <p>Давай познакомимся, чтобы ты мог ощутить все возможности этого Трепло.</p>
      <Form
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              render={({ input }) => (
                <>
                  <label htmlFor="nameInput">Как тебя зовут?</label>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <input {...input} className={css.inputWithMl} id="nameInput" />
                </>
              )}
            />
            <button type="submit">Погнали!</button>
          </form>
        )}
        onSubmit={handleFormSubmit}
      />
      <p>
        Заметка: если нужно что-то отредактировать (например, название или описание),
        просто кликни на него мышкой.
      </p>
    </>
  );
}

const WelcomeHeader = styled.h1``;
