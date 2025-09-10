import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

type CustomDateRangePickerProps = {
  range?: boolean;
  defaultValue?: string | { start: string; end: string };
};

// 범위 하이라이트용 커스텀 Day
function RangePickersDay(
  props: PickersDayProps & {
    start?: Dayjs | null;
    end?: Dayjs | null;
  }
) {
  const { day, start, end, outsideCurrentMonth, ...other } = props;

  const isInRange = start && end && day.isAfter(start, 'day') && day.isBefore(end, 'day');

  const isStart = start && day.isSame(start, 'day');
  const isEnd = end && day.isSame(end, 'day');

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      sx={{
        ...(isInRange && {
          bgcolor: '#E3F2FD',
          borderRadius: 0,
        }),
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
      }}
    />
  );
}

export default function CustomDateRangePicker({
  range = false,
  defaultValue,
}: CustomDateRangePickerProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  let initialStart = dayjs();
  let initialEnd = dayjs();
  let initialSingle = dayjs();

  if (range) {
    if (typeof defaultValue === 'object' && defaultValue) {
      const hasStart = !!defaultValue.start;
      const hasEnd = !!defaultValue.end;

      if (hasStart && hasEnd) {
        // start, end 모두 있음
        initialStart = dayjs(defaultValue.start);
        initialEnd = dayjs(defaultValue.end);
      } else if (hasStart && !hasEnd) {
        // start만 있음 → start=end 동일
        initialStart = dayjs(defaultValue.start);
        initialEnd = dayjs(defaultValue.start);
      } else if (!hasStart && hasEnd) {
        // end만 있음 → start=end 동일
        initialStart = dayjs(defaultValue.end);
        initialEnd = dayjs(defaultValue.end);
      }
    } else if (typeof defaultValue === 'string') {
      // 문자열 하나 들어오면 start=end 동일
      initialStart = dayjs(defaultValue);
      initialEnd = dayjs(defaultValue);
    }
  } else {
    if (typeof defaultValue === 'string') {
      initialSingle = dayjs(defaultValue);
    }
  }

  // 상태 관리
  const [startDate, setStartDate] = React.useState<Dayjs | null>(range ? initialStart : null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(range ? initialEnd : null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    !range ? initialSingle : null
  );

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formattedValue = range
    ? startDate && endDate
      ? `${startDate.format('YYYY-MM-DD')} ~ ${endDate.format('YYYY-MM-DD')}`
      : ''
    : selectedDate
      ? selectedDate.format('YYYY-MM-DD')
      : '';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <TextField
          value={formattedValue}
          onClick={handleOpen}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleOpen}>
                  <CalendarTodayIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <ClickAwayListener onClickAway={handleClose}>
            <Paper sx={{ p: 2, display: 'flex', gap: 2 }}>
              {range ? (
                // ✅ 기간 선택 모드 (달력 2개)
                <>
                  <DateCalendar
                    value={startDate}
                    onChange={(newDate) => {
                      setStartDate(newDate);
                      if (endDate && newDate && newDate.isAfter(endDate)) {
                        setEndDate(null);
                      }
                    }}
                    slots={{
                      day: (dayProps) => (
                        <RangePickersDay {...dayProps} start={startDate} end={endDate} />
                      ),
                    }}
                  />
                  <DateCalendar
                    value={endDate}
                    minDate={startDate || undefined}
                    onChange={(newDate) => setEndDate(newDate)}
                    slots={{
                      day: (dayProps) => (
                        <RangePickersDay {...dayProps} start={startDate} end={endDate} />
                      ),
                    }}
                  />
                </>
              ) : (
                // ✅ 단일 날짜 선택 모드 (달력 1개)
                <DateCalendar
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                />
              )}
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>
    </LocalizationProvider>
  );
}
