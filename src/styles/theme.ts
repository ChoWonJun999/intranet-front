import { alpha, createTheme } from '@mui/material/styles';

const PRIMARY_MAIN = '#103F6F';
const PRIMARY_LIGHT = '#325A84';
const PRIMARY_DARK = '#0B2F54';
const BG_DEFAULT = '#F0F3F7'; // = 대시/폼 영역의 밝은 회색-블루
const DIVIDER = 'rgba(16, 63, 111, 0.12)';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY_MAIN,
      light: PRIMARY_LIGHT,
      dark: PRIMARY_DARK,
      contrastText: '#FFFFFF',
    },
    background: {
      default: BG_DEFAULT,
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0E1A2B',
      secondary: '#4B5565',
    },
    info: {
      main: '#6EA8E5',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#DC2626',
    },
    success: {
      main: '#16A34A',
    },
    divider: DIVIDER,
  },
  shape: { borderRadius: 10 },
  components: {
    // 상단바는 'primary' 색을 기본값으로 두되 음영만 미세 조정
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${DIVIDER}`,
          backgroundImage: 'none',
        },
      },
    },
    // Card/Panel(검색 조건 박스 같은 영역)이 너무 둔탁하지 않게 약한 outline
    MuiPaper: {
      styleOverrides: {
        outlined: {
          borderColor: alpha(PRIMARY_MAIN, 0.12),
          backgroundColor: '#FFFFFF',
        },
      },
    },
    // 버튼: 기본은 contained primary, hover는 primary.light 계열
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 10 },
        containedPrimary: {
          '&:hover': { backgroundColor: PRIMARY_LIGHT },
        },
        outlinedPrimary: {
          borderColor: alpha(PRIMARY_MAIN, 0.32),
          '&:hover': {
            borderColor: alpha(PRIMARY_MAIN, 0.48),
            backgroundColor: alpha(PRIMARY_MAIN, 0.06),
          },
        },
      },
    },
    // 입력 컨트롤: 연청 배경 느낌 대신 선명한 outline + 살짝 블루 포커스
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(PRIMARY_MAIN, 0.25),
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(PRIMARY_MAIN, 0.45),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: PRIMARY_MAIN,
            borderWidth: 2,
          },
          backgroundColor: '#FFFFFF',
        },
      },
    },
    // 라벨/헬퍼텍스트의 대비
    MuiInputLabel: {
      styleOverrides: { root: { color: alpha('#0E1A2B', 0.8) } },
    },
    // 탭/네비 선택 하이라이트를 상단 네비와 조화
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: PRIMARY_LIGHT },
      },
    },
    // Chip/Badge 등 보조 요소
    MuiChip: {
      variants: [
        {
          // color="info" variant="filled" 일 때만 적용
          props: { color: 'info', variant: 'filled' },
          style: { color: '#0D1B2A' },
        },
      ],
    },
  },
});

export default theme;
