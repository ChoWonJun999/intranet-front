import * as Common from '@/components/common';
import { Button } from '@mui/material';
export default function HomePage() {
  const columns = [
    { data: 'date', name: '구매일자' },
    { data: 'buyer', name: '구매자' },
    { data: 'product', name: '제품/프로모션' },
    { data: 'unitPrice', name: '구매단가' },
    { data: 'quantity', name: '구매수량' },
    { data: 'amount', name: '구매금액' },
  ];

  const data = [
    {
      date: '2025-09-20',
      buyer: '홍길동',
      product: 'NEW 어뉴엠 산담은 맑은 청 외 3건',
      unitPrice: 7500,
      quantity: 23,
      amount: 172500,
    },
    {
      date: '2025-09-20',
      buyer: '홍길동',
      product: 'NEW 어뉴엠 산담은 맑은 청 외 3건',
      unitPrice: 7500,
      quantity: 23,
      amount: 172500,
    },
    {
      date: '2025-09-20',
      buyer: '홍길동',
      product: 'NEW 어뉴엠 산담은 맑은 청 외 3건',
      unitPrice: 7500,
      quantity: 23,
      amount: 172500,
    },
  ];
  return (
    <>
      <form action="">
        <i className="fa fa-plus"></i>
        <Common.TableField columns={columns} data={data} />
        <Common.TextField label="이름" />
        {/* <Common.TextField label="비고" multiline rows={2} /> */}

        {/* <Common.EmailField label="이메일" /> */}

        {/* <Common.NumberField label="수량" min={10} max={100} /> */}

        {/* <Common.PatternNumberField required patternType={'MOBILE'} /> */}

        {/* <Common.DateField /> */}
        {/* <Common.DateField defaultValue="2025-10-22" viewsType="month" /> */}
        {/* <Common.DateField defaultValue="2025-10-22" viewsType="year" /> */}
        {/* <Common.DateField defaultValue="20251021" /> */}
        {/* <Common.DateField defaultValue="2025/10/20" /> */}
        {/* <Common.DateField defaultValue="2025.10.19" /> */}
        {/* <Common.DateField range /> */}
        {/* <Box>
          <Common.DateField viewsType="day" required />
          <Common.DateField viewsType="month" />
          <Common.DateField viewsType="year" />
        </Box> */}
        {/* <Box>
          <Common.DateField range viewsType="day" required />
          <Common.DateField range viewsType="month" />
          <Common.DateField range viewsType="year" />
        </Box> */}
        {/* <Common.DateField range defaultValue="2025.10.19" /> */}
        {/* <Common.DateField range defaultValue={{ start: '2025.10.19', end: '2025-10-25' }} /> */}

        {/* <Common.CheckboxField /> */}
        {/* <Common.CheckboxField label="tsetts" /> */}
        {/* <Common.CheckboxField required label="test" asterisk asteriskPosition="start" /> */}
        {/* <Common.CheckboxField required label="test" asterisk /> */}
        {/* <Common.CheckboxField required label="test" /> */}

        <Common.RadioField
          label="성별"
          required
          asterisk
          asteriskPosition="start"
          options={[
            { value: 'female', label: '여성', defaultChecked: true },
            { value: 'male', label: '남성' },
            { value: 'other', label: '기타' },
          ]}
        />

        <Common.PasswordField />
        <Button type="submit">저장</Button>
      </form>
    </>
  );
}
