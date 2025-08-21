// import TextField from '@/components/common/TextField';
import InputField from '@/components/common/InputField';

export default function HomePage() {
  return (
    <>
      <form action="">
        <InputField inputFieldType="text" />
        <InputField
          inputFieldType="text"
          id="testId"
          name="testName"
          inputProps={{ className: 'testClassName', maxLength: 10 }}
          required
        />

        <InputField inputFieldType="email" required />
        {/*
          <InputField type="password" />
          <InputField type="tel" />
          <InputField type="search" />
          <InputField type="number" />
          <InputField type="date" />
        */}
        <button type="submit">제출</button>
      </form>
    </>
  );
}
