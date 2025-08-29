import type { BaseTextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NumericFormat } from 'react-number-format';

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

function CustomField({
  value: propValue,
  defaultValue,
  error: propError,
  thousandSeparator = ',',
  decimalScale = 0,
  fixedDecimalScale = false,
  allowNegative = false,
  allowLeadingZeros = false,
  suffix = '',
  prefix = '',
  maxLength = 20,
  pattern,
  sx,
  ...props
}: TextProps) {
  const [value, setValue] = useState<string>(
    propValue != null ? String(propValue) : defaultValue != null ? String(defaultValue) : ''
  );
  const [isError, setIsError] = useState(propError ?? false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (propError !== undefined) setIsError(propError);
  }, [propError]);

  const clearValidity = () => inputRef.current?.setCustomValidity('');
  const setValidity = (msg: string) => inputRef.current?.setCustomValidity(msg);

  const validate = (raw?: string, floatValue?: number) => {
    if (props.required && (!raw || raw.trim() === '')) return;
    if (floatValue == null || Number.isNaN(floatValue)) return;

    const formatNumber = (num: number) => new Intl.NumberFormat('ko-KR').format(num);

    if (props.min != null && floatValue < props.min) {
      setValidity(`${formatNumber(props.min)} 이상 값을 입력하세요.`);
      return;
    }
    if (props.max != null && floatValue > props.max) {
      setValidity(`${formatNumber(props.max)} 이하 값을 입력하세요.`);
      return;
    }

    clearValidity();
    setIsError(false);
  };

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    if (!e.currentTarget.validity.valid) setIsError(true);
    props.onInvalid?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.required && !isError) setIsError(e.currentTarget.value === '');
    props.onBlur?.(e);
  };

  const inputProps = useMemo(
    () => ({
      maxLength,
      pattern,
      onInvalid: handleInvalid,
      ...props.inputProps,
    }),
    [maxLength, pattern, props.inputProps]
  );

  /** Merged sx */
  const mergedSx = useMemo(
    () => ({
      '& input': { textAlign: 'right' },
      ...sx,
    }),
    [sx]
  );

  return (
    <NumericFormat
      {...props}
      value={value}
      inputRef={inputRef}
      customInput={TextField}
      valueIsNumericString
      thousandSeparator={thousandSeparator}
      thousandsGroupStyle="thousand"
      decimalSeparator="."
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      allowNegative={allowNegative}
      allowLeadingZeros={allowLeadingZeros}
      suffix={suffix}
      prefix={prefix}
      inputProps={inputProps}
      sx={mergedSx}
      error={isError}
      size={props.size ?? 'small'}
      autoComplete={props.autoComplete ?? 'off'}
      autoFocus={props.autoFocus ?? false}
      fullWidth={props.fullWidth ?? false}
      onValueChange={({ value, floatValue, formattedValue }) => {
        setValue(formattedValue);
        clearValidity();
        validate(value, floatValue);
      }}
      onChange={props.onChange}
      onBlur={handleBlur}
    />
  );
}

export default CustomField;
