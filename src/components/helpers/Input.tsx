import React, { useCallback } from 'react';

export type InputProps = {
  className?: string;
  id?: string;
  value?: string;
  onChange?: (v: string) => void;
};

export default function Input(props: InputProps) {
  const {
    id, value, className, onChange,
  } = props;

  const handleOnChange = useCallback((event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  }, [onChange]);

  return <input type="string" className={className} id={id} value={value} onChange={handleOnChange} />;
}
