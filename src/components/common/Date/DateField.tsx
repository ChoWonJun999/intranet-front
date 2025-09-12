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
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    handleClose();
  };

  const handleConfirm = () => {
    if (draftSingle) {
      setCommittedSingle(draftSingle);
      onChange?.(draftSingle.format(formatForm));
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
              <Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>오늘</Box>
                  <Box>전일</Box>
                </Box>
              </Box>
              <DateCalendar
                value={draftSingle}
                views={resolvedViews}
                sx={{ maxHeight: CalendarmaxHeight }}
                onChange={(newDate) => setDraftSingle(newDate)}
                slotProps={{
                  day: {
                    onDoubleClick: () => {
                      handleConfirm();
                    },
                  },
                  monthButton: {
                    onClick: (e) => {
                      console.log(e);
                      console.log(e.target);
                      console.log(e.currentTarget);
                      e.currentTarget.onselect;
                      // e.preventDefault();
                      // handleConfirm();
                    },
                    onDoubleClick: () => {
                      handleConfirm();
                    },
                  },
                  yearButton: {
                    onDoubleClick: () => {
                      handleConfirm();
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
