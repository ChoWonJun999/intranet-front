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
import type { BaseTextFieldProps } from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useRef, useState } from 'react';

import CalendarControls from './CalendarControls';
import RangePickersDay from './RangePickersDay';
import { createRangeSlotProps, getFormatForm, getInputWidth, getRangeLength } from './utils';

type DateRangeFieldProps = BaseTextFieldProps & {
  viewsType?: 'year' | 'month' | 'day';
  defaultValue?: { start: string; end: string };
  onChangePopup?: (value: { start: string; end: string }) => void;
};

function DateRangeField({ viewsType = 'day', size = 'small', ...props }: DateRangeFieldProps) {
  const startRef = useRef<HTMLInputElement | null>(null);
  const [isError, setIsError] = useState(props.error ?? false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const clearValidity = () => startRef.current?.setCustomValidity('');
  const setValidity = (msg: string) => startRef.current?.setCustomValidity(msg);

  useEffect(() => {
    if (props.error !== undefined) setIsError(props.error);
  }, [props.error]);

  // 초기값 세팅
  const today = dayjs();
  const initialStart = props.defaultValue?.start ? dayjs(props.defaultValue.start) : null;
  const initialEnd = props.defaultValue?.end ? dayjs(props.defaultValue.end) : null;

  const [committedStart, setCommittedStart] = useState<Dayjs | null>(initialStart);
  const [committedEnd, setCommittedEnd] = useState<Dayjs | null>(initialEnd);

  const [draftStart, setDraftStart] = useState<Dayjs | null>(initialStart || today);
  const [draftEnd, setDraftEnd] = useState<Dayjs | null>(initialEnd || today);

  const open = Boolean(anchorEl);
  const formatForm = getFormatForm(viewsType);

  /** 팝업 닫기 */
  const closePopup = (mode: 'confirm' | 'cancel' | 'clickaway') => {
    if (mode === 'confirm' && draftStart && draftEnd) {
      clearValidity();
      setIsError(false);
      setCommittedStart(draftStart);
      setCommittedEnd(draftEnd);
      const value = {
        start: draftStart.format(formatForm),
        end: draftEnd.format(formatForm),
      };
      props.onChangePopup?.(value);
    }

    if (mode === 'cancel' && committedStart && committedEnd) {
      setDraftStart(committedStart);
      setDraftEnd(committedEnd);
      props.onChangePopup?.({
        start: committedStart.format(formatForm),
        end: committedEnd.format(formatForm),
      });
    }

    setAnchorEl(null);
  };

  /** validation */
  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      setValidity('날짜를 선택하세요.');
      setIsError(true);
    }
    props.onInvalid?.(e);
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

  const handleSetting = (action: CalendarAction) => {
    let start = draftStart || dayjs();
    let end = draftEnd || dayjs();

    switch (action) {
      case 'current':
        start = dayjs();
        end = dayjs();
        break;
      case 'next':
        start = dayjs().add(1, viewsType);
        end = dayjs().add(1, viewsType);
        break;
      case 'prev':
        start = dayjs().subtract(1, viewsType);
        end = dayjs().subtract(1, viewsType);
        break;
      case 'Q1':
        start = dayjs().month(0).date(1);
        end = dayjs().month(2).endOf('month');
        break;
      case 'Q2':
        start = dayjs().month(3).date(1);
        end = dayjs().month(5).endOf('month');
        break;
      case 'Q3':
        start = dayjs().month(6).date(1);
        end = dayjs().month(8).endOf('month');
        break;
      case 'Q4':
        start = dayjs().month(9).date(1);
        end = dayjs().month(11).endOf('month');
        break;
      case 'H1':
        start = dayjs().month(0).date(1);
        end = dayjs().month(5).endOf('month');
        break;
      case 'H2':
        start = dayjs().month(6).date(1);
        end = dayjs().month(11).endOf('month');
        break;
      default:
        start = start.month(action as number).date(1);
        end = end.month(action as number).endOf('month');
    }

    setDraftStart(start);
    setDraftEnd(end);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box sx={{ display: 'inline-flex' }}>
        {/* Input Fields */}
        <Box sx={{ display: 'flex', gap: 0.5 }} onClick={() => setAnchorEl(startRef.current)}>
          <TextField
            {...props}
            id={props.id ? props.id + '-start' : props.id}
            inputRef={startRef}
            value={committedStart ? committedStart.format(formatForm) : ''}
            error={isError}
            size={size}
            onInvalid={handleInvalid}
            sx={{
              width: `${getInputWidth(viewsType)}rem`,
              '& .MuiInputBase-root, & .MuiInputBase-input': { cursor: 'pointer' },
              ...props.sx,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                  <CalendarTodayIcon sx={{ cursor: 'pointer', height: '20px' }} />
                </InputAdornment>
              ),
              inputProps: {
                onKeyDown: (e) => e.preventDefault(),
                sx: {
                  padding: '3px 10px',
                },
              },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>~</Box>
          <TextField
            {...props}
            id={props.id ? props.id + '-end' : props.id}
            value={committedEnd ? committedEnd.format(formatForm) : ''}
            error={isError}
            size={size}
            sx={{
              width: `${getInputWidth(viewsType)}rem`,
              '& .MuiInputBase-root, & .MuiInputBase-input': { cursor: 'pointer' },
              ...props.sx,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                  <CalendarTodayIcon sx={{ cursor: 'pointer', height: '20px' }} />
                </InputAdornment>
              ),
              inputProps: {
                onKeyDown: (e) => e.preventDefault(),
                sx: {
                  padding: '3px 10px',
                },
              },
            }}
          />
        </Box>

        {/* Popup */}
        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <ClickAwayListener onClickAway={() => closePopup('clickaway')}>
            <Paper sx={{ p: 1, display: 'block' }}>
              <CalendarControls viewsType={viewsType} onSelect={handleSetting} />
              <Box sx={{ display: 'flex' }}>
                <DateCalendar
                  value={draftStart}
                  views={['day', 'month', 'year']}
                  openTo={viewsType}
                  onChange={(newDate) => {
                    setDraftStart(newDate);
                    if (draftEnd && newDate && newDate.isAfter(draftEnd)) {
                      setDraftEnd(null);
                    }
                  }}
                  slotProps={createRangeSlotProps(
                    'start',
                    () => closePopup('confirm'),
                    viewsType,
                    draftStart,
                    setDraftStart
                  )}
                  slots={{
                    day: (dayProps) => (
                      <RangePickersDay {...dayProps} start={draftStart} end={draftEnd} />
                    ),
                  }}
                />
                <DateCalendar
                  value={draftEnd}
                  views={['day', 'month', 'year']}
                  openTo={viewsType}
                  minDate={draftStart || undefined}
                  onChange={(newDate) => setDraftEnd(newDate)}
                  slotProps={createRangeSlotProps(
                    'end',
                    () => closePopup('confirm'),
                    viewsType,
                    draftEnd,
                    setDraftEnd
                  )}
                  slots={{
                    day: (dayProps) => (
                      <RangePickersDay {...dayProps} start={draftStart} end={draftEnd} />
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  선택 기간:{' '}
                  {draftStart && draftEnd ? getRangeLength(draftStart, draftEnd, viewsType) : null}
                </Box>
                <Box>
                  <Button size="small" variant="contained" onClick={() => closePopup('confirm')}>
                    확인
                  </Button>
                  <Button size="small" onClick={() => closePopup('cancel')}>
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
