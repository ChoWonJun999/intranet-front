import {
  DateField,
  EmailField,
  NumberField,
  PasswordField,
  PatternNumberField,
  TextField,
} from '@/components/common';
export default function HomePage() {
  return (
    <>
      <form action="">
        <TextField label="이름" />
        <TextField label="비고" multiline rows={2} />
        <EmailField label="이메일" />
        <NumberField required label="수량" min={10} max={100} />
        <PatternNumberField required patternType={'MOBILE'} />
        <input type="date" name="" id="" />
        <DateField defaultValue="2025-10-22" />
        <DateField defaultValue="20251021" />
        <DateField defaultValue="2025/10/20" />
        <DateField defaultValue="2025.10.19" />
        <DateField defaultValue="null" />
        <DateField defaultValue=null />
        <DateField range />
        <DateField range defaultValue="2025.10.19" />
        <DateField range defaultValue={{ start: '2025.10.19' }} />
        <DateField range defaultValue={{ end: '2025.10.12' }} />
        <DateField range defaultValue={{ start: '2025.10.19', end: '2025-10-25' }} />
        <PasswordField />
        <button type="submit">저장</button>
        <input type="submit" value="저장2" />
      </form>
    </>
  );
}
