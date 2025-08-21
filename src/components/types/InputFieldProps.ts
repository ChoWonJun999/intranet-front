import type { BaseTextFieldProps } from '@mui/material/TextField';

export type CommonProps = BaseTextFieldProps;

export type TextKinds = 'text' | 'email' | 'password' | 'tel' | 'search';

export type TextProps = BaseTextFieldProps & {
  inputFieldType: TextKinds;
  rootSlotProps?: React.ElementType;
  // onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

export type NumberProps = BaseTextFieldProps & {
  inputFieldType: 'number';
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

export type DateProps = BaseTextFieldProps & {
  inputFieldType: 'date' | 'datetime-local' | 'month' | 'week' | 'time';
  value?: string; // ISO-ish
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

// ... file, checkbox, radio 등등

export type InputFieldProps = TextProps | NumberProps | DateProps /* | ... */;
