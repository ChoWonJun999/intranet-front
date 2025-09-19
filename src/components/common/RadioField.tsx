import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { RadioProps } from '@mui/material/Radio';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

// 기본 원형 아이콘
const CustomIcon = styled('span')<{ isError?: boolean }>(({ theme, isError }) => ({
  width: 18,
  height: 18,
  borderRadius: '50%',
  border: `1px solid ${isError ? theme.palette.error.main : theme.palette.grey[400]}`,
  backgroundColor: theme.palette.common.white,
  display: 'inline-block',
  transition: 'all 120ms',
  'input:disabled ~ &': {
    backgroundColor: theme.palette.action.disabledBackground,
    borderColor: theme.palette.action.disabled,
  },
  'input:hover ~ &': {
    borderColor: isError ? theme.palette.error.main : theme.palette.text.primary,
  },
}));

// 선택된 아이콘
const CustomCheckedIcon = styled(CustomIcon)(({ theme, isError }) => ({
  border: `1px solid ${isError ? theme.palette.error.main : theme.palette.primary.main}`,
  backgroundColor: isError ? theme.palette.error.main : theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.common.white,
  },
}));

export type RadioOption = {
  value: string;
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  checked?: boolean;
};

export type Props = RadioProps & {
  label?: string;
  error?: boolean;
  required?: boolean;

  options: RadioOption[];

  asterisk?: boolean;
  asteriskPosition?: 'start' | 'end';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function RadioField({
  label,
  error,
  required,
  options,
  asterisk,
  asteriskPosition = 'end',
  onChange,
  ...props
}: Props) {
  const [isError, setIsError] = useState(error ?? false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error !== undefined) setIsError(error);
  }, [error]);

  const clearValidity = () => inputRef.current?.setCustomValidity('');
  const setValidity = (msg: string) => inputRef.current?.setCustomValidity(msg);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearValidity();
    setIsError(false);

    onChange?.(e);
  };

  const handleInvalid = (e: any) => {
    if (required) {
      setValidity((label ?? '라디오') + '은(는) 필수 선택입니다.');
      setIsError(true);
    }
  };

  const renderLabel = () => {
    if (!label) return null;
    return (
      <label style={{ marginBottom: 4, display: 'inline-block' }}>
        {asterisk && asteriskPosition === 'start' && required && (
          <span style={{ marginRight: 2, color: 'red' }}>*</span>
        )}
        {label}
        {asterisk && asteriskPosition === 'end' && required && (
          <span style={{ marginLeft: 2, color: 'red' }}>*</span>
        )}
      </label>
    );
  };

  const customCheckBox = (customProps: RadioProps, idx: number) => {
    return (
      <Radio
        id={customProps.id}
        name={props.name}
        defaultChecked={customProps.defaultChecked}
        checkedIcon={<CustomCheckedIcon isError={isError} />}
        icon={<CustomIcon isError={isError} />}
        disableRipple
        color={props.color ?? 'primary'}
        disabled={customProps.disabled}
        checked={customProps.checked}
        size={props.size ?? 'small'}
        onChange={handleChange}
        inputRef={idx === 0 ? inputRef : undefined}
        sx={{
          padding: 0,
          paddingRight: 1,
        }}
      />
    );
  };

  return (
    <FormControl error={isError} required={required}>
      {renderLabel()}
      <RadioGroup name="radio-field" onChange={handleChange} onInvalid={handleInvalid}>
        {options.map((opt, idx) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={customCheckBox(opt, idx)}
            label={opt.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
