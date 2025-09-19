import { Box, Button } from '@mui/material';

type Props = {
  viewsType: 'year' | 'month' | 'day';
  onSelect: (action: 'current' | 'next' | 'prev' | number) => void;
};

export default function CalendarControls({ viewsType, onSelect }: Props) {
  const buttonTodayText = viewsType === 'year' ? '년' : viewsType === 'month' ? '월' : '일';

  return (
    <Box>
      <Box>
        <Button size="small" onClick={() => onSelect('current')}>
          금{buttonTodayText}
        </Button>
        <Button size="small" onClick={() => onSelect('prev')}>
          작{buttonTodayText}
        </Button>
        <Button size="small" onClick={() => onSelect('next')}>
          익{buttonTodayText}
        </Button>
      </Box>

      {viewsType !== 'year' && (
        <>
          <Box>
            <Button size="small" onClick={() => onSelect(0)}>
              1분기
            </Button>
            <Button size="small" onClick={() => onSelect(3)}>
              2분기
            </Button>
            <Button size="small" onClick={() => onSelect(6)}>
              3분기
            </Button>
            <Button size="small" onClick={() => onSelect(9)}>
              4분기
            </Button>
            <Button size="small" onClick={() => onSelect(0)}>
              상반기
            </Button>
            <Button size="small" onClick={() => onSelect(5)}>
              하반기
            </Button>
          </Box>
          <Box>
            {Array.from({ length: 12 }, (_, i) => (
              <Button key={i} size="small" onClick={() => onSelect(i)}>
                {i + 1}월
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
