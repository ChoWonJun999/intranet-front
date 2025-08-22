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

  const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.setCustomValidity('');
    // setIsError(false);
  };

  const inputProps = {
    maxLength: props.multiline ? 1000 : 100,
    onInvalid: (e: any) => {
      const el = e.target as HTMLInputElement;
      if (el.validity.valueMissing) {
        el.setCustomValidity(props.label + '을(를) 입력하세요.');
        setIsError(true);
      }
    },
    onInput: handleInput,
    ...props.inputProps,
  };

  const sx = {
    '& .MuiOutlinedInput-root.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#61050aff',
    },
    '& .MuiOutlinedInput-root.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: 'error.main',
    },
    ...props.sx,
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
      sx={sx}
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
