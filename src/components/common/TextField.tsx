import type { BaseTextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export type TextProps = BaseTextFieldProps & {
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
    e.target.setCustomValidity('');
    props.onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.required) {
      const empty = e.target.value.trim() === '';
      setIsError(empty);
    }

    props.onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onFocus?.(e);
  };

  const handleInvalid = (e: any) => {
    const el = e.target as HTMLInputElement;
    el.setCustomValidity('');
    if (e.target.value === '') {
      el.setCustomValidity(props.label + '을(를) 입력하세요.');
      setIsError(true);
    } else {
      el.setCustomValidity('');
      setIsError(false);
    }
    props.onInvalid?.(e);
  };

  const inputProps = {
    maxLength: props.multiline ? 1000 : 100,
    ...props.inputProps,
  };

  return (
    <TextField
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      required={props.required}
      disabled={props.disabled}
      multiline={props.multiline}
      rows={props.rows}
      maxRows={props.maxRows}
      minRows={props.minRows}
      autoComplete={props.autoComplete ?? 'off'}
      autoFocus={props.autoFocus ?? false}
      variant={props.variant}
      error={isError}
      size={props.size ?? 'small'}
      label={props.label}
      sx={props.sx}
      fullWidth={props.fullWidth ?? false}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onInvalid={handleInvalid}
      inputProps={inputProps}
      InputLabelProps={props.InputLabelProps}
    />
  );
}

export default CustomField;
