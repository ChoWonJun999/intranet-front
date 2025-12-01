import * as Common from '@/components/common';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

function createData(
  id: number,
  date: Date,
  buyer: string,
  product: string,
  unitPrice: number,
  quantity: number,
  amount: number
) {
  return { id, date, buyer, product, unitPrice, quantity, amount };
}

const rows = [
  createData(
    1,
    new Date('2025-09-20'),
    '홍길동',
    'NEW 어뉴엠 산담은 맑은 청 외 3건',
    7500,
    23,
    172500
  ),
  createData(
    2,
    new Date('2025-09-20'),
    '홍길동',
    'NEW 어뉴엠 산담은 맑은 청 외 3건',
    7500,
    23,
    172500
  ),
  createData(
    3,
    new Date('2025-09-20'),
    '홍길동',
    'NEW 어뉴엠 산담은 맑은 청 외 3건',
    7500,
    23,
    172500
  ),
];

export default function PurchasePage() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/purchase');
  };
  const handleNewClick = () => {
    navigate('/purchase/add');
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography variant="h5" component="div">
          조회 결과
        </Typography>
        <Stack spacing={1} direction="row">
          <Button variant="contained" onClick={handleNewClick}>
            신규입력
          </Button>
          <Button variant="contained">엑셀 업로드</Button>
          <Button variant="contained">엑셀 다운로드</Button>
        </Stack>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">구매일자</TableCell>
              <TableCell align="center">구매자</TableCell>
              <TableCell align="center">제품/프로모션</TableCell>
              <TableCell align="center">구매단가</TableCell>
              <TableCell align="center">구매수량</TableCell>
              <TableCell align="center">구매금액</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.date.toString()}</TableCell>
                <TableCell align="center">{row.buyer}</TableCell>
                <TableCell align="center">{row.product}</TableCell>
                <TableCell align="right">{row.unitPrice}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
