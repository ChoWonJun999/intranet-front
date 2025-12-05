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
import { createSlotProps, getFormatForm, getInputWidth } from './utils';

type DateFieldProps = BaseTextFieldProps & {
  viewsType?: 'year' | 'month' | 'day';
  defaultValue?: string;
  onChangePopup?: (value: string) => void;
};

function DateField({ viewsType = 'day', size = 'small', ...props }: DateFieldProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isError, setIsError] = useState(props.error ?? false);
  const [committedSingle, setCommittedSingle] = useState<Dayjs | null>(null);
  const [draftSingle, setDraftSingle] = useState<Dayjs | null>(
    props.defaultValue ? dayjs(props.defaultValue) : dayjs()
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const open = Boolean(anchorEl);
  const formatForm = getFormatForm(viewsType);

  // error props 연동
  useEffect(() => {
    if (props.error !== undefined) setIsError(props.error);
  }, [props.error]);

  const setValidity = (msg: string) => inputRef.current?.setCustomValidity(msg);
  const clearValidity = () => inputRef.current?.setCustomValidity('');

  /** 팝업 닫기 */
  const closePopup = (mode: 'confirm' | 'cancel' | 'clickaway') => {
    if (mode === 'confirm' && draftSingle) {
      clearValidity();
      setIsError(false);
      setCommittedSingle(draftSingle);
      props.onChangePopup?.(draftSingle.format(formatForm));
    }
    if (mode === 'cancel' && committedSingle) {
      setDraftSingle(committedSingle);
    }
    setAnchorEl(null);
  };

  /** 날짜 빠른 설정 */
  const handleSetting = (action: 'current' | 'next' | 'prev' | number) => {
    let newDate = draftSingle || dayjs();
    switch (action) {
      case 'current':
        newDate = dayjs();
        break;
      case 'next':
        newDate = dayjs().add(1, viewsType);
        break;
      case 'prev':
        newDate = dayjs().subtract(1, viewsType);
        break;
      default:
        newDate = newDate.month(action);
    }
    setDraftSingle(newDate);
  };

  /** validation 핸들러 */
  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      setValidity('날짜를 선택하세요.');
      setIsError(true);
    }
    props.onInvalid?.(e);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box sx={{ display: 'inline-flex' }}>
        <TextField
          {...props}
          value={committedSingle ? committedSingle.format(formatForm) : ''}
          error={isError}
          onInvalid={handleInvalid}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          inputRef={inputRef}
          size={size}
          focused={open}
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
          sx={{
            width: `${getInputWidth(viewsType)}rem`,
            '& .MuiInputBase-root, & .MuiInputBase-input': { cursor: 'pointer' },
            ...props.sx,
          }}
        />

        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <ClickAwayListener onClickAway={() => closePopup('clickaway')}>
            <Paper sx={{ p: 1, display: 'block', gap: 1 }}>
              <CalendarControls viewsType={viewsType} onSelect={handleSetting} />
              <DateCalendar
                value={draftSingle}
                views={['day', 'month', 'year']}
                openTo={viewsType}
                sx={{ maxHeight: 300 }}
                onChange={setDraftSingle}
                slotProps={createSlotProps(
                  () => closePopup('confirm'),
                  viewsType,
                  draftSingle,
                  setDraftSingle
                )}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>선택 일자: {draftSingle?.format(formatForm)}</Box>
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

export default DateField;
