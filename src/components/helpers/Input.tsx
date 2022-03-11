import React, { useCallback } from 'react';

export type InputProps = {
  value?: string;
  onChange?: (v: string) => void;
};

export default function Input(props: InputProps) {
  const { value, onChange } = props;

  const handleOnChange = useCallback((event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  }, [onChange]);

  return <input type="string" value={value} onChange={handleOnChange} />;
}
