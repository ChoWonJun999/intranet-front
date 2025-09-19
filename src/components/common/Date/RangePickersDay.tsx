import { PickersDay, type PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Dayjs } from 'dayjs';

type Props = PickersDayProps & {
  start?: Dayjs | null;
  end?: Dayjs | null;
};

export default function RangePickersDay({
  day,
  start,
  end,
  outsideCurrentMonth,
  disabled,
  ...other
}: Props) {
  const isInRange = start && end && day.isAfter(start, 'day') && day.isBefore(end, 'day');
  const isStart = start && day.isSame(start, 'day');
  const isEnd = end && day.isSame(end, 'day');

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      sx={{
        ...(isInRange && { bgcolor: '#E3F2FD', borderRadius: 0 }),
        ...(isStart && {
          bgcolor: '#1976d2',
          color: 'white',
          borderTopLeftRadius: '50%',
          borderBottomLeftRadius: '50%',
        }),
        ...(isEnd && {
          bgcolor: '#1976d2',
          color: 'white',
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '50%',
        }),
        ...(disabled && {
          color: '#BDBDBD',
          bgcolor: 'transparent',
          textDecoration: 'line-through',
          pointerEvents: 'none',
        }),
      }}
    />
  );
}
