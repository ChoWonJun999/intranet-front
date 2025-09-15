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
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import * as React from 'react';

type DateFieldProps = {
  viewsType?: 'year' | 'month' | 'day';
  defaultValue?: string | { start: string; end: string };
  onChange?: (value: string | { start: string; end: string }) => void;
};

function DateField({ defaultValue, viewsType = 'day', onChange }: DateFieldProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const resolvedViews: Array<'year' | 'month' | 'day'> =
    viewsType === 'year'
      ? ['year']
      : viewsType === 'month'
        ? ['month', 'year']
        : ['day', 'month', 'year'];

  let initialSingle: Dayjs | null = null;

  if (typeof defaultValue === 'string') {
    initialSingle = dayjs(defaultValue);
  }

  const today = dayjs();

  const [committedSingle, setCommittedSingle] = React.useState<Dayjs | null>(null);

  const [draftSingle, setDraftSingle] = React.useState<Dayjs | null>(initialSingle ?? today);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    const commitedDate = committedSingle ? dayjs(committedSingle) : dayjs();
    setDraftSingle(commitedDate);
    onChange?.(commitedDate.format(formatForm));

    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    if (draftSingle) {
      setCommittedSingle(draftSingle);
      onChange?.(draftSingle.format(formatForm));
    }

    setAnchorEl(null);
  };

  const handelSetting = (action: 'current' | 'next' | 'prev' | number) => {
    let settingDate = draftSingle || dayjs();
    switch (action) {
      case 'current':
        settingDate = dayjs();
        break;
      case 'next':
        settingDate = dayjs().add(1, viewsType);
        break;
      case 'prev':
        settingDate = dayjs().subtract(1, viewsType);
        break;
      default:
        settingDate = settingDate.month(action);
    }
    setDraftSingle(settingDate);
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

  const buttonTodayText = viewsType === 'year' ? '년' : viewsType === 'month' ? '월' : '일';

  const CalendarControls = () => {
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
              <Button size="small" onClick={() => handelSetting(0)}>
                1분기
              </Button>
              <Button size="small" onClick={() => handelSetting(3)}>
                2분기
              </Button>
              <Button size="small" onClick={() => handelSetting(6)}>
                3분기
              </Button>
              <Button size="small" onClick={() => handelSetting(9)}>
                4분기
              </Button>
              <Button size="small" onClick={() => handelSetting(0)}>
                상반기
              </Button>
              <Button size="small" onClick={() => handelSetting(5)}>
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

  const defaultSlotProps = () => {
    const sp = {
      day: {
        onDoubleClick: () => {
          handleConfirm();
        },
      },
      monthButton: {
        onDoubleClick: () => {
          handleConfirm();
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

          const newDate = dayjs(draftSingle).month(selectedMonth);
          setDraftSingle(newDate);
        },
      } as any;
    }

    return sp;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box sx={{ display: 'inline-flex' }}>
        <TextField
          value={committedSingle ? committedSingle.format(formatForm) : ''}
          focused={open}
          size="small"
          onClick={(e) => handleOpen(e)}
          sx={defaultTextFieldStyle}
          InputProps={defaultInputProps}
        />

        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper sx={{ p: 1, display: 'block', gap: 1 }}>
              {CalendarControls()}
              <DateCalendar
                value={draftSingle}
                views={resolvedViews}
                openTo={viewsType}
                sx={{ maxHeight: CalendarmaxHeight }}
                onChange={(newDate) => setDraftSingle(newDate)}
                slotProps={defaultSlotProps()}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>선택 일자: {draftSingle?.format(formatForm)}</Box>

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

export default DateField;
