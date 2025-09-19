import type { BaseTextFieldProps } from '@mui/material/TextField';
import DateField from './DateField';
import DateRangeField from './DateRangeField';

export type CustomDateFieldProps = BaseTextFieldProps & {
  range?: boolean;
  viewsType?: 'year' | 'month' | 'day';
  defaultValue?: string | { start: string; end: string };
  onChangePopup?: (value: string | { start: string; end: string }) => void;
};

export default function CustomDateField({ range, ...props }: CustomDateFieldProps) {
  if (range) {
    return (
      <DateRangeField
        {...(props as Omit<CustomDateFieldProps, 'defaultValue'> & {
          defaultValue?: { start: string; end: string };
        })}
      />
    );
  }
  return (
    <DateField
      {...(props as Omit<CustomDateFieldProps, 'defaultValue'> & { defaultValue?: string })}
    />
  );
}
