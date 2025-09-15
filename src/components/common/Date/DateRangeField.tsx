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

type DateRangeFieldProps = {
  viewsType?: 'year' | 'month' | 'day';
  defaultValue?: string | { start: string; end: string };
  onChange?: (value: string | { start: string; end: string }) => void;
};

function DateRangeField({ defaultValue, viewsType = 'day', onChange }: DateRangeFieldProps) {
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

  const today = dayjs();

  const [committedStart, setCommittedStart] = React.useState<Dayjs | null>(null);
  const [committedEnd, setCommittedEnd] = React.useState<Dayjs | null>(null);

  const [draftStart, setDraftStart] = React.useState<Dayjs | null>(initialStart ?? today);
  const [draftEnd, setDraftEnd] = React.useState<Dayjs | null>(initialEnd ?? today);

  const open = Boolean(anchorEl);

  const handleOpen = () => {
    setAnchorEl(startRef.current);
  };

  const handleClose = () => {
    const commitedStartDate = committedStart ? dayjs(committedStart) : dayjs();
    const commitedEndDate = committedEnd ? dayjs(committedEnd) : dayjs();
    setDraftStart(commitedStartDate);
    setDraftEnd(commitedEndDate);
    onChange?.({
      start: commitedStartDate.format(formatForm),
      end: commitedEndDate.format(formatForm),
    });

    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    if (draftStart && draftEnd) {
      setCommittedStart(draftStart);
      setCommittedEnd(draftEnd);

      onChange?.({
        start: draftStart.format(formatForm),
        end: draftEnd.format(formatForm),
      });
    }

    setAnchorEl(null);
  };

  type CalendarAction =
    | 'current'
    | 'next'
    | 'prev'
    | number
    | 'Q1'
    | 'Q2'
    | 'Q3'
    | 'Q4'
    | 'H1'
    | 'H2';

  const handelSetting = (action: CalendarAction) => {
    let settingStartDate = draftStart || dayjs();
    let settingEndDate = draftEnd || dayjs();

    switch (action) {
      case 'current':
        settingStartDate = dayjs();
        settingEndDate = dayjs();
        break;
      case 'next':
        settingStartDate = dayjs().add(1, viewsType);
        settingEndDate = dayjs().add(1, viewsType);
        break;
      case 'prev':
        settingStartDate = dayjs().subtract(1, viewsType);
        settingEndDate = dayjs().subtract(1, viewsType);
        break;
      case 'Q1':
        settingStartDate = dayjs().month(0).date(1);
        settingEndDate = dayjs().month(2).endOf('month');
        break;
      case 'Q2':
        settingStartDate = dayjs().month(3).date(1);
        settingEndDate = dayjs().month(5).endOf('month');
        break;
      case 'Q3':
        settingStartDate = dayjs().month(6).date(1);
        settingEndDate = dayjs().month(8).endOf('month');
        break;
      case 'Q4':
        settingStartDate = dayjs().month(9).date(1);
        settingEndDate = dayjs().month(11).endOf('month');
        break;
      case 'H1':
        settingStartDate = dayjs().month(0).date(1);
        settingEndDate = dayjs().month(5).endOf('month');
        break;
      case 'H2':
        settingStartDate = dayjs().month(6).date(1);
        settingEndDate = dayjs().month(11).endOf('month');
        break;
      default:
        // 월 선택 (0~11)
        settingStartDate = settingStartDate.month(action as number).date(1);
        settingEndDate = settingEndDate.month(action as number).endOf('month');
    }

    setDraftStart(settingStartDate);
    setDraftEnd(settingEndDate);
  };

  const buttonTodayText = viewsType === 'year' ? '년' : viewsType === 'month' ? '월' : '일';
  const CalendarControls = function () {
    return (
      <Box>
        <Box>
          <Button size="small" onClick={() => handelSetting('current')}>
            금{buttonTodayText}
          </Button>
          <Button size="small" onClick={() => handelSetting('prev')}>
            작{buttonTodayText}
          </Button>
          <Button size="small" onClick={() => handelSetting('next')}>
            익{buttonTodayText}
          </Button>
        </Box>
        {viewsType === 'year' ? null : (
          <>
            <Box>
              <Button size="small" onClick={() => handelSetting('Q1')}>
                1분기
              </Button>
              <Button size="small" onClick={() => handelSetting('Q2')}>
                2분기
              </Button>
              <Button size="small" onClick={() => handelSetting('Q3')}>
                3분기
              </Button>
              <Button size="small" onClick={() => handelSetting('Q4')}>
                4분기
              </Button>
              <Button size="small" onClick={() => handelSetting('H1')}>
                상반기
              </Button>
              <Button size="small" onClick={() => handelSetting('H2')}>
                하반기
              </Button>
            </Box>
            <Box>
              {Array.from({ length: 12 }, (_, i) => (
                <Button key={i} size="small" onClick={() => handelSetting(i)}>
                  {i + 1}월
                </Button>
              ))}
            </Box>
          </>
        )}
      </Box>
    );
  };

  const formatForm =
    viewsType === 'year' ? 'YYYY' : viewsType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD';

  const formatFormWidth =
    viewsType === 'year'
      ? formatForm.length + 2
      : viewsType === 'month'
        ? formatForm.length + 0.5
        : formatForm.length - 1;

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

  const CalendarmaxHeight = 300;

  const defaultSlotProps = (position: 'start' | 'end') => {
    position === 'end';
    const sp = {
      day: (dayProps: PickersDayProps) => ({
        onDoubleClick: () => {
          console.log(dayProps);
          handleConfirm();
        },
        sx: {
          ...(dayProps.isInRange && {
            bgcolor: '#E3F2FD',
            borderRadius: 0,
          }),
          ...(dayProps.isStart && {
            bgcolor: '#1976d2',
            color: 'white',
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
          }),
          ...(dayProps.isEnd && {
            bgcolor: '#1976d2',
            color: 'white',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '50%',
          }),
          ...(dayProps.disabled && {
            color: '#BDBDBD',
            bgcolor: 'transparent',
            textDecoration: 'line-through',
            pointerEvents: 'none',
          }),
        },
      }),
      monthButton: {
        onDoubleClick: () => {
          handleConfirm();
        },
        sx: {
          '&.Mui-disabled': {
            color: '#BDBDBD',
            bgcolor: 'transparent',
            textDecoration: 'line-through',
            pointerEvents: 'none',
          },
        },
      },
      yearButton: {
        onDoubleClick: () => {
          handleConfirm();
        },
      },
    };

    if (viewsType === 'month') {
      sp.monthButton = {
        ...sp.monthButton,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          const el = e.currentTarget;
          const selectedMonth = parseInt(el.textContent!.slice(0, -1), 10) - 1;
          e.preventDefault();
          e.stopPropagation();

          const newDate = dayjs(position === 'start' ? draftStart : draftEnd).month(selectedMonth);
          position === 'start' ? setDraftStart(newDate) : setDraftEnd(newDate);
        },
      } as any;
    }

    return sp;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box sx={{ display: 'inline-flex' }}>
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

        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper sx={{ p: 1, display: 'block' }}>
              {CalendarControls()}
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
                    // slots={{
                    //   day: (dayProps) => (
                    //     <RangePickersDay {...dayProps} start={draftStart} end={draftEnd} />
                    //   ),
                    // }}
                    slotProps={defaultSlotProps('end')}
                  />
                  <DateCalendar
                    value={draftEnd}
                    views={resolvedViews}
                    openTo={viewsType}
                    sx={{ maxHeight: CalendarmaxHeight }}
                    minDate={draftStart || undefined}
                    onChange={(newDate) => setDraftEnd(newDate)}
                    // slots={{
                    //   day: (dayProps) => (
                    //     <RangePickersDay {...dayProps} start={draftStart} end={draftEnd} />
                    //   ),
                    // }}
                    slotProps={defaultSlotProps('end')}
                  />
                </Box>
              </>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  선택 기간:
                  {draftStart && draftEnd
                    ? viewsType === 'day'
                      ? `${draftEnd.diff(draftStart, 'day') + 1}일`
                      : viewsType === 'month'
                        ? `${draftEnd.diff(draftStart, 'month') + 1}개월`
                        : `${draftEnd.diff(draftStart, 'year') + 1}년`
                    : null}
                </Box>

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

export default DateRangeField;
