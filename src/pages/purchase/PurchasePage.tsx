import * as Common from '@/components/common';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    field: 'date',
    headerName: '구매일자',
    width: 150,
    // type: 'date',
    // editable: true,
    // renderEditCell: (params: any) => {
    //   console.log(params.formattedValue);
    //   return <Common.DateField defaultValue={params.formattedValue} />;
    // },
  },
  {
    field: 'buyer',
    headerName: '구매자',
    width: 150,
  },
  {
    field: 'product',
    headerName: '제품/프로모션',
    description: '등록된 제품',
    flex: 1,
  },
  {
    field: 'unitPrice',
    headerName: '구매단가',
    type: 'number',
    width: 160,
  },
  {
    field: 'quantity',
    headerName: '구매수량',
    type: 'number',
    width: 160,
  },
  {
    field: 'amount',
    headerName: '구매금액',
    type: 'number',
    width: 160,
  },
];

const rows = [
  {
    date: '2025-12-04',
    buyer: '홍길동',
    product: 'NEW 어뉴엠 산담은 맑은청 외 3건',
    unitPrice: 7500,
    quantity: 23,
    amount: 172500,
  },
  {
    date: '2025-12-04',
    buyer: '홍길동',
    product: 'NEW 어뉴엠 산담은 맑은청 외 3건',
    unitPrice: 7500,
    quantity: 23,
    amount: 172500,
  },
  {
    date: '2025-12-04',
    buyer: '홍길동',
    product: 'NEW 어뉴엠 산담은 맑은청 외 3건',
    unitPrice: 7500,
    quantity: 23,
    amount: 172500,
  },
  {
    date: '2025-12-04',
    buyer: '홍길동',
    product: 'NEW 어뉴엠 산담은 맑은청 외 3건',
    unitPrice: 7500,
    quantity: 23,
    amount: 172500,
  },
  {
    date: '2025-12-04',
    buyer: '홍길동',
    product: 'NEW 어뉴엠 산담은 맑은청 외 3건',
    unitPrice: 7500,
    quantity: 23,
    amount: 172500,
  },
  {
    date: '2025-12-04',
    buyer: '홍길동',
    product: 'NEW 어뉴엠 산담은 맑은청 외 3건',
    unitPrice: 7500,
    quantity: 23,
    amount: 172500,
  },
  {
    date: '2025-12-04',
    buyer: '홍길동',
    product: 'NEW 어뉴엠 산담은 맑은청 외 3건',
    unitPrice: 7500,
    quantity: 23,
    amount: 172500,
  },
  {
    date: '2025-12-04',
    buyer: '홍길동',
    product: 'NEW 어뉴엠 산담은 맑은청 외 3건',
    unitPrice: 7500,
    quantity: 23,
    amount: 172500,
  },
  {
    date: '2025-12-04',
    buyer: '홍길동',
    product: 'NEW 어뉴엠 산담은 맑은청 외 3건',
    unitPrice: 7500,
    quantity: 23,
    amount: 172500,
  },
];

export default function PurchasePage() {
  const navigate = useNavigate();

  const handleSearchClick = () => navigate('/purchase');

  return (
    <>
      <Typography variant="h5" component="div">
        구매 조회
      </Typography>
      <Card sx={{ minWidth: 275, marginBottom: 3 }}>
        <CardContent>
          <Stack direction="row">
            <Stack direction="row" sx={{ marginRight: 2 }}>
              <Typography variant="body1" gutterBottom sx={{ marginRight: 1, placeSelf: 'center' }}>
                구매기간
              </Typography>
              <Common.DateField range />
            </Stack>
            <Stack direction="row" sx={{ marginRight: 2 }}>
              <Typography variant="body1" gutterBottom sx={{ marginRight: 1, placeSelf: 'center' }}>
                제품명
              </Typography>
              <Common.TextField />
            </Stack>
            <Stack direction="row">
              <Typography variant="body1" gutterBottom sx={{ marginRight: 3, placeSelf: 'center' }}>
                상태
              </Typography>
              <Common.RadioField
                options={[
                  { value: 'Y', label: '사용', defaultChecked: true },
                  { value: 'N', label: '미사용' },
                ]}
              />
            </Stack>
            <Button variant="contained" onClick={handleSearchClick}>
              조회
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Common.TableField columns={columns} rows={rows} />
    </>
  );
}
