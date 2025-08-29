import type { BaseTextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export type TextProps = BaseTextFieldProps & {
  rootSlotProps?: React.ElementType;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

function CustomField(props: TextProps) {
  const [value, setValue] = useState(props.value ?? '');
  const [isError, setIsError] = useState(props.error ?? false);

  useEffect(() => {
    if (props.value !== undefined) setValue(props.value || '');
  }, [props.value]);

  useEffect(() => {
    if (props.error !== undefined) setIsError(props.error);
  }, [props.error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onFocus?.(e);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const el = e.currentTarget as HTMLInputElement;
    el.setCustomValidity('');
    if (el.validity.valid) {
      setIsError(false);
    }
  };

  const inputProps = {
    maxLength: 50,
    onInvalid: (e: any) => {
      const el = e.target as HTMLInputElement;
      if (!el.validity.valid) {
        setIsError(true);
      }

      if (el.validity.valueMissing) {
        el.setCustomValidity(props.label + '을(를) 입력하세요.');
      }
    },
    onInput: handleInput,
    ...props.inputProps,
  };

  return (
    <TextField
      type="email"
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      required={props.required}
      disabled={props.disabled}
      autoComplete={props.autoComplete ?? 'email'}
      autoFocus={props.autoFocus ?? false}
      variant={props.variant}
      error={isError}
      size={props.size ?? 'small'}
      label={props.label}
      sx={props.sx}
      // helperText={props.helperText}
      fullWidth={props.fullWidth ?? false}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      inputProps={inputProps}
      InputLabelProps={props.InputLabelProps}
    />
  );
}

export default CustomField;
