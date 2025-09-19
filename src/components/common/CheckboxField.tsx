import type { CheckboxProps } from '@mui/material/Checkbox';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

const CustomIcon = styled('span')<{ isError?: boolean }>(({ theme, isError }) => ({
  width: 18,
  height: 18,
  borderRadius: 4,
  border: `1px solid ${isError ? theme.palette.error.main : theme.palette.grey[400]}`,
  backgroundColor: theme.palette.common.white,
  display: 'inline-block',
  transition: 'all 120ms',
  'input:disabled ~ &': {
    backgroundColor: theme.palette.action.disabledBackground,
    borderColor: theme.palette.action.disabled,
  },
  'input:hover ~ &': {
    borderColor: theme.palette.text.primary,
  },
}));

const CustomCheckedIcon = styled(CustomIcon)(({ theme, isError }) => ({
  backgroundColor: isError ? theme.palette.error.main : theme.palette.primary.main,
  borderColor: isError ? theme.palette.error.main : theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    display: 'block',
    width: 12,
    height: 12,
    maskImage:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='white' d='M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/></svg>\")",
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    maskSize: 'contain',
    backgroundColor: theme.palette.common.white,
  },
  'input:hover ~ &': {
    backgroundColor: isError ? theme.palette.error.dark : theme.palette.primary.dark,
    borderColor: isError ? theme.palette.error.dark : theme.palette.primary.dark,
  },
}));

export type Props = CheckboxProps & {
  label?: string;
  error?: boolean;
  asterisk?: boolean;
  asteriskPosition?: 'start' | 'end';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function CustomField({ label, error, asterisk, asteriskPosition = 'end', ...props }: Props) {
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
    props.onChange?.(e);
  };

  const handleInvalid = (e: any) => {
    if (props.required) {
      setValidity((label ?? '체크박스') + '은(는) 필수 선택입니다.');
      setIsError(true);
    }

    props.onInvalid?.(e);
  };

  const customCheckBox = (customProps: CheckboxProps) => {
    return (
      <Checkbox
        id={customProps.id}
        name={customProps.name}
        defaultChecked={customProps.defaultChecked}
        checkedIcon={<CustomCheckedIcon isError={isError} />}
        icon={<CustomIcon isError={isError} />}
        disableRipple
        color={customProps.color ?? 'primary'}
        disabled={customProps.disabled}
        checked={customProps.checked}
        indeterminate={customProps.indeterminate}
        required={customProps.required}
        size={customProps.size ?? 'small'}
        onChange={handleChange}
        onInvalid={handleInvalid}
        sx={{
          padding: 0,
        }}
        inputRef={inputRef}
      />
    );
  };

  return (
    <label style={{ cursor: 'pointer', marginRight: 10 }}>
      {customCheckBox(props)}
      {asterisk && asteriskPosition === 'start' && props.required && (
        <span style={{ marginLeft: 2 }}>*</span>
      )}
      <span style={{ marginLeft: 4 }}>{label}</span>
      {asterisk && asteriskPosition === 'end' && props.required && (
        <span style={{ marginLeft: 2 }}>*</span>
      )}
    </label>
  );
}

export default CustomField;
