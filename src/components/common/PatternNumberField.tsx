import type { BaseTextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from 'react';

export type PatternType = 'MOBILE' | 'LANDLINE' | 'REPRESENTATIVE';

export type TextProps = BaseTextFieldProps & {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  patternType: PatternType;
  patternLength?: Number;
};

function CustomField(props: TextProps) {
  const [value, setValue] = useState(props.value ?? '');
  const [isError, setIsError] = useState(props.error ?? false);
  const inputRef = useRef<HTMLInputElement>(null);

  const patternLength =
    props.patternType === 'MOBILE'
      ? 13
      : props.patternType === 'LANDLINE'
        ? 12
        : props.patternType === 'REPRESENTATIVE'
          ? 9
          : null;

  useEffect(() => {
    if (props.value !== undefined) setValue(props.value || '');
  }, [props.value]);

  useEffect(() => {
    if (props.error !== undefined) setIsError(props.error);
  }, [props.error]);

  const formatPhoneNumber = (digits: string) => {
    switch (props.patternType) {
      case 'MOBILE':
        if (digits.length <= 3) return digits;
        else if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
        else if (digits.length <= 10)
          return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
      case 'LANDLINE':
        if (digits.length <= 4) return digits;
        else if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        else if (digits.length <= 9)
          return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
        return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
      case 'REPRESENTATIVE':
        if (digits.length <= 4) return digits;
        return `${digits.slice(0, 4)}-${digits.slice(4)}`;
      default:
        return digits;
    }
  };

  const clearValidity = () => inputRef.current?.setCustomValidity('');
  const setValidity = (msg: string) => inputRef.current?.setCustomValidity(msg);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const el = e.target;
    const prevValue = String(value);
    const prevDigits = prevValue.replace(/\D/g, '');
    const cursor = el.selectionStart || 0;
    const rawDigits = el.value.replace(/\D/g, '');

    const formatted = formatPhoneNumber(rawDigits);
    setValue(formatted);
    clearValidity();

    requestAnimationFrame(() => {
      if (inputRef.current) {
        let newCursor = cursor;

        if (rawDigits.length > prevDigits.length) {
          for (let i = 0; i < formatted.length; i++) {
            if (formatted[i] === '-' && prevValue[i] !== '-') {
              if (cursor > i) newCursor++;
            }
          }

          if (formatted[newCursor] === '-') newCursor++;
        }

        inputRef.current.setSelectionRange(newCursor, newCursor);
      }
    });

    props.onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.required) {
      const empty = e.target.value.trim() === '';
      setIsError(empty);

      if (patternLength && patternLength !== e.target.value.length) {
        setValidity(`규격이 맞지 않습니다.`);
        setIsError(true);
      }
    }

    props.onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onFocus?.(e);
  };

  const handleInvalid = (e: any) => {
    if (e.target.value === '') {
      setValidity(props.label + '을(를) 입력하세요.');
      setIsError(true);
    }

    props.onInvalid?.(e);
  };

  const inputProps = {
    maxLength: patternLength,
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
      inputRef={inputRef}
      inputProps={inputProps}
      InputLabelProps={props.InputLabelProps}
    />
  );
}

export default CustomField;
