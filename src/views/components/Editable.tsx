import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Input from './helpers/Input';

export type EditableTitleProps = {
  value?: string;
  onChange: (v: string) => void;
  multiline?: boolean;
};

export default function Editable(props: EditableTitleProps) {
  const { value = '', onChange, multiline = false } = props;
  const [changedTitle, setTitle] = useState(value);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleCancelClick = useCallback(() => {
    setIsEditingTitle(false);
    setTitle('');
    onChange('');
  }, [setIsEditingTitle, setTitle]);

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    setIsEditingTitle(false);
    onChange(changedTitle);
  }, [onChange, handleCancelClick, changedTitle]);

  return (
    <div>
      {isEditingTitle ? (
        <form onSubmit={handleFormSubmit}>
          {multiline
            ? <Textarea value={changedTitle} onChange={(e) => setTitle(e.target.value)} />
            : <Input value={changedTitle} onChange={setTitle} />}
          <button type="submit">✅</button>
          <button type="button" onClick={handleCancelClick}>❌</button>
        </form>
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
      ) : <span onClick={() => setIsEditingTitle(true)}>{value || '...'}</span>}
    </div>
  );
}

const Textarea = styled.textarea`
  width: 100%;
`;
