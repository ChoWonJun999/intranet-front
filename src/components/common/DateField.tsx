import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  Box,
  Button,
  ClickAwayListener,
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
import 'dayjs/locale/ko';
import * as React from 'react';

type CustomDateRangePickerProps = {
  viewsType?: 'year' | 'month' | 'day';
  range?: boolean;
  defaultValue?: string | { start: string; end: string };
  onChange?: (value: string | { start: string; end: string }) => void;
};

function RangePickersDay(
  props: PickersDayProps & {
    start?: Dayjs | null;
    end?: Dayjs | null;
  }
) {
  const { day, start, end, outsideCurrentMonth, disabled, ...other } = props;
  const isInRange = start && end && day.isAfter(start, 'day') && day.isBefore(end, 'day');
  const isStart = start && day.isSame(start, 'day');
  const isEnd = end && day.isSame(end, 'day');

  return (
    <PickersDay
      {...other}
      day={day}
      // outsideCurrentMonth={outsideCurrentMonth}
      outsideCurrentMonth={false}
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

function CustomField({
  range = false,
  defaultValue,
  viewsType = 'day',
  onChange,
}: CustomDateRangePickerProps) {
  const startRef = React.useRef<HTMLInputElement | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const resolvedViews: Array<'year' | 'month' | 'day'> =
    viewsType === 'year'
      ? ['year']
      : viewsType === 'month'
        ? ['month', 'year']
        : ['day', 'month', 'year'];

  let initialStart: Dayjs | null = null;
  let initialEnd: Dayjs | null = null;
  let initialSingle: Dayjs | null = null;

  if (range) {
    if (typeof defaultValue === 'object' && defaultValue) {
      const hasStart = !!defaultValue.start;
      const hasEnd = !!defaultValue.end;

      if (hasStart && hasEnd) {
        initialStart = dayjs(defaultValue.start);
        initialEnd = dayjs(defaultValue.end);
      } else if (hasStart && !hasEnd) {
        initialStart = dayjs(defaultValue.start);
        initialEnd = dayjs(defaultValue.start);
      } else if (!hasStart && hasEnd) {
        initialStart = dayjs(defaultValue.end);
        initialEnd = dayjs(defaultValue.end);
      }
    } else if (typeof defaultValue === 'string') {
      initialStart = dayjs(defaultValue);
      initialEnd = dayjs(defaultValue);
    }
  } else {
    if (typeof defaultValue === 'string') {
      initialSingle = dayjs(defaultValue);
    }
  }

  const today = dayjs();

  const [committedStart, setCommittedStart] = React.useState<Dayjs | null>(null);
  const [committedEnd, setCommittedEnd] = React.useState<Dayjs | null>(null);
  const [committedSingle, setCommittedSingle] = React.useState<Dayjs | null>(null);

  const [draftStart, setDraftStart] = React.useState<Dayjs | null>(
    range ? (initialStart ?? today) : null
  );
  const [draftEnd, setDraftEnd] = React.useState<Dayjs | null>(
    range ? (initialEnd ?? today) : null
  );
  const [draftSingle, setDraftSingle] = React.useState<Dayjs | null>(
    !range ? (initialSingle ?? today) : null
  );

  const open = Boolean(anchorEl);

  const handleOpen = () => {
    setAnchorEl(startRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    handleClose();
  };

  const handleConfirm = () => {
    if (range) {
      if (draftStart && draftEnd) {
        setCommittedStart(draftStart);
        setCommittedEnd(draftEnd);

        onChange?.({
          start: draftStart.format(formatForm),
          end: draftEnd.format(formatForm),
        });
      }
    } else {
      if (draftSingle) {
        setCommittedSingle(draftSingle);
        onChange?.(draftSingle.format(formatForm));
      }
    }

    handleClose();
  };

  const formatForm =
    viewsType === 'year' ? 'YYYY' : viewsType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD';

  const formatFormWidth =
    viewsType === 'year'
      ? formatForm.length + 2
      : viewsType === 'month'
        ? formatForm.length + 0.5
        : formatForm.length - 1;

  const CalendarmaxHeight = 300;

  const defaultTextFieldStyle = {
    width: `${formatFormWidth}rem`,
    '& .MuiInputBase-root': {
      cursor: 'pointer',
    },
    '& .MuiInputBase-input': {
      cursor: 'pointer',
    },
  };

  const defaultInputProps = {
    readOnly: true,
    endAdornment: (
      <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
        <CalendarTodayIcon sx={{ cursor: 'pointer' }} />
      </InputAdornment>
    ),
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box sx={{ display: 'inline-flex' }}>
        {range ? (
          <Box sx={{ display: 'flex', gap: 0.5 }} onClick={() => handleOpen()}>
            <TextField
              inputRef={startRef}
              value={committedStart ? committedStart.format(formatForm) : ''}
              focused={open}
              size="small"
              sx={defaultTextFieldStyle}
              InputProps={defaultInputProps}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>~</Box>
            <TextField
              value={committedEnd ? committedEnd.format(formatForm) : ''}
              focused={open}
              size="small"
              sx={defaultTextFieldStyle}
              InputProps={defaultInputProps}
            />
          </Box>
        ) : (
          <TextField
            inputRef={startRef}
            value={committedSingle ? committedSingle.format(formatForm) : ''}
            focused={open}
            size="small"
            onClick={() => handleOpen()}
            sx={defaultTextFieldStyle}
            InputProps={defaultInputProps}
          />
        )}

        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper sx={{ p: 1, display: 'block', gap: 1 }}>
              <Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>오늘</Box>
                  <Box>전일</Box>
                </Box>
                {range ? (
                  <>
                    <Box sx={{ display: 'flex' }}>
                      <Box>1/4분기</Box>
                      <Box>2/4분기</Box>
                      <Box>3/4분기</Box>
                      <Box>4/4분기</Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Box>1월</Box>
                      <Box>2월</Box>
                      <Box>3월</Box>
                      <Box>4월</Box>
                      <Box>5월</Box>
                      <Box>6월</Box>
                      <Box>7월</Box>
                      <Box>8월</Box>
                      <Box>9월</Box>
                      <Box>10월</Box>
                      <Box>11월</Box>
                      <Box>12월</Box>
                    </Box>
                  </>
                ) : null}
              </Box>
              {range ? (
                <>
                  <Box sx={{ display: 'flex' }}>
                    <DateCalendar
                      value={draftStart}
                      views={resolvedViews}
                      openTo={viewsType}
                      sx={{ maxHeight: CalendarmaxHeight }}
                      onChange={(newDate) => {
                        setDraftStart(newDate);
                        if (draftEnd && newDate && newDate.isAfter(draftEnd)) {
                          setDraftEnd(null);
                        }
                      }}
                      slots={{
                        day: (dayProps) => (
                          <RangePickersDay {...dayProps} start={draftStart} end={draftEnd} />
                        ),
                      }}
                      slotProps={{
                        monthButton: {
                          sx: {
                            '&.Mui-disabled': {
                              color: '#ffffff',
                              bgcolor: '#9E9E9E',
                              borderRadius: '8px',
                              opacity: 0.7,
                              pointerEvents: 'none',
                            },
                          },
                        },
                        yearButton: {
                          sx: {
                            '&.Mui-disabled': {
                              color: '#ffffff',
                              bgcolor: '#9E9E9E',
                              borderRadius: '8px',
                              opacity: 0.7,
                              pointerEvents: 'none',
                            },
                          },
                        },
                      }}
                    />
                    <DateCalendar
                      value={draftEnd}
                      views={resolvedViews}
                      sx={{ maxHeight: CalendarmaxHeight }}
                      minDate={draftStart || undefined}
                      onChange={(newDate) => setDraftEnd(newDate)}
                      slots={{
                        day: (dayProps) => (
                          <RangePickersDay {...dayProps} start={draftStart} end={draftEnd} />
                        ),
                      }}
                      slotProps={{
                        monthButton: {
                          sx: {
                            '&.Mui-disabled': {
                              color: '#BDBDBD',
                              bgcolor: 'transparent',
                              textDecoration: 'line-through',
                              pointerEvents: 'none',
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                </>
              ) : (
                <DateCalendar
                  value={draftSingle}
                  views={resolvedViews}
                  sx={{ maxHeight: CalendarmaxHeight }}
                  onChange={(newDate) => setDraftSingle(newDate)}
                />
              )}
              <Box
                sx={
                  range
                    ? { display: 'flex', justifyContent: 'space-between' }
                    : { display: 'flex', justifyContent: 'flex-end' }
                }
              >
                {range ? (
                  <Box>
                    선택기간:
                    {draftStart && draftEnd
                      ? viewsType === 'day'
                        ? `${draftEnd.diff(draftStart, 'day') + 1}일`
                        : viewsType === 'month'
                          ? `${draftEnd.diff(draftStart, 'month') + 1}개월`
                          : `${draftEnd.diff(draftStart, 'year') + 1}년`
                      : null}
                  </Box>
                ) : null}

                <Box>
                  <Button size="small" variant="contained" onClick={handleConfirm}>
                    확인
                  </Button>
                  <Button size="small" onClick={handleClose}>
                    취소
                  </Button>
                </Box>
              </Box>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>
    </LocalizationProvider>
  );
}

export default CustomField;
