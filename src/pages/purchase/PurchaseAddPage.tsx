import * as Common from '@/components/common';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

export default function PurchaseAddPage() {
  // detail row state
  type DetailRow = {
    id: number;
    product: string;
    unitPrice: number | null;
    qty: number | null;
    amount: number;
  };
  const [details, setDetails] = useState<DetailRow[]>([]);

  const handleAddClick = () => {
    setDetails((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        product: '',
        unitPrice: null,
        qty: null,
        amount: 0,
      },
    ]);
  };

  const handleDetailChange = (id: number, field: keyof DetailRow, value: number | string) => {
    setDetails((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;

        const updated = { ...row };

        if (field === 'product') {
          updated.product = String(value);
        } else {
          updated[field] = Number(value);
        }

        // 숫자 계산
        updated.amount = (updated.unitPrice || 0) * (updated.qty || 0);

        return updated;
      })
    );
  };

  return (
    <>
      <Typography variant="h5" component="div">
        구매 입력
      </Typography>
      <Typography variant="h5" component="div">
        구매 마스터
      </Typography>

      <Card sx={{ minWidth: 275, marginBottom: 3, width: 'fit-content' }}>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell align="center">구매순번</TableCell>
                  <TableCell align="center">
                    <Common.TextField sx={{ width: '100%' }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">구매일자</TableCell>
                  <TableCell align="center">
                    <Common.DateField sx={{ width: '100%' }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">구매회원</TableCell>
                  <TableCell align="center">
                    <Common.TextField disabled sx={{ width: '100%' }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography variant="h5" component="div">
          조회 결과
        </Typography>

        <Stack spacing={1} direction="row">
          <Button variant="contained" onClick={handleAddClick}>
            추가
          </Button>
        </Stack>
      </Box>

      <TableContainer id="detail" component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">제품/프로모션</TableCell>
              <TableCell align="center">구매단가</TableCell>
              <TableCell align="center">구매수량</TableCell>
              <TableCell align="center">구매금액</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {details.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>

                <TableCell align="center">
                  <select name="" id="">
                    <option value="">선택</option>
                    <option value="1">NEW 어뉴엠 산담은 맑은청</option>
                    <option value="2">어뉴엠 내몸에 비움 공식</option>
                    <option value="3">시그니엠 퍼밍리치 에센스</option>
                    <option value="4">시그니엠 실키리치 세럼</option>
                  </select>
                </TableCell>

                <TableCell align="center">
                  <Common.NumberField
                    name="unitPrice"
                    value={row.unitPrice?.toString() ?? ''}
                    onValueChange={(num) => handleDetailChange(row.id, 'unitPrice', num)}
                  />
                </TableCell>

                <TableCell align="center">
                  <Common.NumberField
                    name="quantity"
                    value={row.qty?.toString() ?? ''}
                    onValueChange={(num) => handleDetailChange(row.id, 'qty', num)}
                  />
                </TableCell>

                <TableCell align="center">
                  <Common.NumberField name="amount" disabled value={row.amount.toString()} />
                </TableCell>

                <TableCell align="center">
                  <Button>삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
