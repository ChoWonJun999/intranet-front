/*
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import type { BaseTextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { IMaskInput } from 'react-imask';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#00-000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  }
);

export type TextProps = Omit<
  BaseTextFieldProps & {
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    thousandSeparator?: boolean | string;
    decimalScale?: number;
    fixedDecimalScale?: boolean;
    allowNegative?: boolean;
    allowLeadingZeros?: boolean;
    suffix?: string;
    prefix?: string;
    pattern?: string;
    min?: number;
    max?: number;
    maxLength?: number;
  },
  'type'
>;

function CustomField() {
  const [values, setValues] = React.useState('010-000-0000');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value);
  };

  return (
    <FormControl variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input">react-imask</InputLabel>
      <Input
        value={values}
        onChange={handleChange}
        name="textmask"
        id="formatted-text-mask-input"
        inputComponent={TextMaskCustom as any}
      />
    </FormControl>
  );
}

export default CustomField;
 */

import React, { useRef, useState } from 'react';

function PhoneInput() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const formatPhoneNumber = (digits: string) => {
    const part1 = digits.substring(0, 3);
    const part2 = digits.substring(3, 6);
    const part3 = digits.substring(6, 10);

    if (digits.length > 6) return `${part1}-${part2}-${part3}`;
    if (digits.length > 3) return `${part1}-${part2}`;
    if (digits.length > 0) return `${part1}`;
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const cursor = el.selectionStart || 0; // 입력 전 커서 위치
    const rawDigits = el.value.replace(/\D/g, '');

    const formatted = formatPhoneNumber(rawDigits);
    setValue(formatted);

    // setState 이후 커서 위치 복원
    requestAnimationFrame(() => {
      if (inputRef.current) {
        let newCursor = cursor;

        // 고정 문자 때문에 커서 밀리는 보정
        if (formatted[cursor - 1] && /\D/.test(formatted[cursor - 1])) {
          newCursor++;
        }

        inputRef.current.setSelectionRange(newCursor, newCursor);
      }
    });
  };

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={handleChange}
      placeholder="(123) 456-7890"
      maxLength={14}
    />
  );
}

export default PhoneInput;
