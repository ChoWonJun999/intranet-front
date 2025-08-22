import { EmailField, PasswordField, TextField } from '@/components/common';
export default function HomePage() {
  return (
    <>
      <form action="">
        <TextField label="이름" required />
        <TextField label="비고" multiline rows={2} />
        <EmailField label="이메일" />
        <PasswordField />
        <button type="submit">저장</button>
      </form>
    </>
  );
}
