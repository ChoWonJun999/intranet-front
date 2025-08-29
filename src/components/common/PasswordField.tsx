import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import type { BaseTextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useEffect, useState } from 'react';

export type TextProps = BaseTextFieldProps & {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

function CustomField(props: TextProps) {
  const [value, setValue] = useState(props.value ?? '');
  const [isError, setIsError] = useState(props.error ?? false);
  const [showPassword, setShowPassword] = useState(false);

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
    const el = e.currentTarget as HTMLInputElement;
    el.setCustomValidity('');
    if (el.validity.valid) {
      setIsError(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const inputProps = {
    maxLength: 30,
    onInvalid: (e: any) => {
      const el = e.target as HTMLInputElement;
      if (el.validity.valueMissing)
        el.setCustomValidity((props.label || 'password') + '을(를) 입력하세요.');
    },
    onInput: handleInput,
    ...props.inputProps,
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      required
      disabled={props.disabled}
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
      inputProps={inputProps}
      InputLabelProps={props.InputLabelProps}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default CustomField;
