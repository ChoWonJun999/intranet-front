import type { InputFieldProps } from '@/components/types/InputFieldProps';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export default function InputField(props: InputFieldProps) {
  const [value, setValue] = useState(props.value ?? props.defaultValue ?? '');
  const [error, setError] = useState(props.error ?? false);

  useEffect(() => {
    if (props.value !== undefined) setValue(props.value || '');
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValue(val);
    props.onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.required) {
      const nextError = value === '';
      setError(nextError);
    }
    props.onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onFocus?.(e);
  };

  switch (props.inputFieldType) {
    case 'text':
      return (
        <TextField
          id={props.id}
          name={props.name}
          defaultValue={props.defaultValue || ''}
          value={value}
          placeholder={props.placeholder}
          required={props.required}
          disabled={props.disabled}
          autoComplete="off"
          autoFocus={false}
          variant={props.variant}
          error={error}
          size={props.size || 'small'}
          label={props.label}
          sx={{}}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          inputProps={props.inputProps}
          InputLabelProps={props.InputLabelProps}
          helperText={props.helperText}
        />
      );
    case 'email':
      return (
        <TextField
          type="email"
          id={props.id}
          name={props.name}
          defaultValue={props.defaultValue || ''}
          value={value}
          placeholder={props.placeholder}
          required={props.required}
          disabled={props.disabled}
          autoComplete="email"
          autoFocus={false}
          variant={props.variant}
          error={error}
          size={props.size || 'small'}
          label={props.label}
          sx={{}}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          inputProps={props.inputProps}
          InputLabelProps={props.InputLabelProps}
          helperText={props.helperText}
        />
      );
    case 'password':
    case 'tel':
    case 'search':
    case 'number':
    case 'date':
    case 'datetime-local':
    case 'month':
    case 'week':
    case 'time':
    // file/checkbox/radio/select 등 필요할 때 추가
  }
}
