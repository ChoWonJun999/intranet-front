import * as Common from '@/components/common';
import { Box } from '@mui/material';
export default function HomePage() {
  return (
    <>
      <form action="">
        {/* <Common.TextField label="이름" /> */}
        {/* <Common.TextField label="비고" multiline rows={2} /> */}
        {/* <Common.EmailField label="이메일" /> */}
        {/* <Common.NumberField required label="수량" min={10} max={100} /> */}
        {/* <Common.PatternNumberField required patternType={'MOBILE'} /> */}

        {/* <Common.DateField /> */}
        {/* <Common.DateField defaultValue="2025-10-22" viewsType="month" /> */}
        {/* <Common.DateField defaultValue="2025-10-22" viewsType="year" /> */}
        {/* <Common.DateField defaultValue="20251021" /> */}
        {/* <Common.DateField defaultValue="2025/10/20" /> */}
        {/* <Common.DateField defaultValue="2025.10.19" /> */}
        {/* <Common.DateField range /> */}
        <Box>
          <Common.DateField viewsType="day" />
          <Common.DateField viewsType="month" />
          <Common.DateField viewsType="year" />
        </Box>
        <Box>
          <Common.DateField range viewsType="day" />
          <Common.DateField range viewsType="month" />
          <Common.DateField range viewsType="year" />
        </Box>
        {/* <Common.DateField range defaultValue="2025.10.19" /> */}
        {/* <Common.DateField range defaultValue={{ start: '2025.10.19', end: '2025-10-25' }} /> */}

        {/* <Common.PasswordField /> */}
        <button type="submit">저장</button>
        <input type="submit" value="저장2" />
      </form>
    </>
  );
}
