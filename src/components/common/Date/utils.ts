import dayjs, { Dayjs } from 'dayjs';

export const getFormatForm = (viewsType: 'year' | 'month' | 'day') =>
  viewsType === 'year' ? 'YYYY' : viewsType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD';

export const getInputWidth = (viewsType: 'year' | 'month' | 'day') =>
  viewsType === 'year' ? 6 : viewsType === 'month' ? 8 : 9;

export const getRangeLength = (start: Dayjs, end: Dayjs, viewsType: 'year' | 'month' | 'day') => {
  if (viewsType === 'day') return `${end.diff(start, 'day') + 1}일`;
  if (viewsType === 'month') return `${end.diff(start, 'month') + 1}개월`;
  return `${end.diff(start, 'year') + 1}년`;
};

export const createRangeSlotProps = (
  position: 'start' | 'end',
  onConfirm: () => void,
  viewsType: 'year' | 'month' | 'day',
  draftValue: Dayjs | null,
  setDraftValue: (d: Dayjs) => void
) => {
  const sp: any = {
    day: { onDoubleClick: onConfirm },
    monthButton: { onDoubleClick: onConfirm },
    yearButton: { onDoubleClick: onConfirm },
  };

  if (viewsType === 'month') {
    sp.monthButton = {
      ...sp.monthButton,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        const el = e.currentTarget;
        const selectedMonth = parseInt(el.textContent!.slice(0, -1), 10) - 1;
        e.preventDefault();
        e.stopPropagation();
        setDraftValue(dayjs(draftValue).month(selectedMonth));
      },
    };
  }
  return sp;
};

export const createSlotProps = (
  onConfirm: () => void,
  viewsType: 'year' | 'month' | 'day',
  draftSingle: Dayjs | null,
  setDraftSingle: (d: Dayjs) => void
) => {
  const sp: any = {
    day: { onDoubleClick: onConfirm },
    monthButton: { onDoubleClick: onConfirm },
    yearButton: { onDoubleClick: onConfirm },
  };

  if (viewsType === 'month') {
    sp.monthButton = {
      ...sp.monthButton,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        const el = e.currentTarget;
        const selectedMonth = parseInt(el.textContent!.slice(0, -1), 10) - 1;
        e.preventDefault();
        e.stopPropagation();
        setDraftSingle(dayjs(draftSingle).month(selectedMonth));
      },
    };
  }
  return sp;
};
