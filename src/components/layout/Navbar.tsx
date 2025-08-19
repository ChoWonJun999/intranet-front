// src/components/Navbar.tsx
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type NavItem = { name: string; url: string; end?: boolean };

const menus: NavItem[] = [
  { name: '대시보드', url: '/', end: true },
  { name: '사용자 관리', url: '/home' },
];

export default function Navbar() {
  //   const [menus, setMenus] = useState<Menu[]>([]);

  //   useEffect(() => {
  //     menusApi.list().then(setMenus);
  //   }, []);

  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  const toggle = (val: boolean) => () => setOpen(val);

  const isActive = (to: string, end?: boolean) => {
    // NavLink의 end 동작과 동일하게 처리
    if (end) return pathname === to;
    return pathname === to || pathname.startsWith(to + '/');
  };

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {/* 모바일: 햄버거 */}
          <Box sx={{ display: { xs: 'inline-flex', md: 'none' }, mr: 1 }}>
            <IconButton edge="start" color="inherit" aria-label="메뉴 열기" onClick={toggle(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* 브랜드/시스템명 */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, letterSpacing: 0.2, flexGrow: { xs: 1, md: 0 } }}
          >
            ODPIA Intranet
          </Typography>

          {/* 데스크톱: 네비게이션 버튼 */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 3, gap: 0.5 }}>
            {menus.map((item) => (
              <Button
                key={item.url}
                component={NavLink}
                to={item.url}
                // NavLink의 className 대신 sx로 활성화 상태 스타일링
                sx={(theme) => ({
                  color: 'inherit',
                  px: 1.5,
                  opacity: isActive(item.url, item.end) ? 1 : 0.9,
                  ...(isActive(item.url, item.end) && {
                    backgroundColor: 'rgba(255,255,255,0.12)',
                  }),
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.18)',
                  },
                })}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* 오른쪽 유틸(알림/프로필 자리) */}
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            {/* 필요 시 알림, 프로필 메뉴 등 배치 */}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 모바일 Drawer */}
      <Drawer anchor="left" open={open} onClose={toggle(false)}>
        <Box
          role="presentation"
          sx={{ width: 260 }}
          onClick={toggle(false)}
          onKeyDown={toggle(false)}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              시스템
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ODPIA Intranet
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ p: 1 }}>
            {menus.map((item) => {
              const active = isActive(item.url, item.end);
              return (
                <Button
                  key={item.url}
                  fullWidth
                  component={NavLink}
                  to={item.url}
                  sx={{
                    justifyContent: 'flex-start',
                    mb: 0.5,
                    ...(active && {
                      backgroundColor: 'action.selected',
                    }),
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
