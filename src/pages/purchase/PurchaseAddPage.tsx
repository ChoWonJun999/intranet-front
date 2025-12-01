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
    price: string;
    qty: string;
    amount: string;
  };

  const [details, setDetails] = useState<DetailRow[]>([]);

  const handleAddClick = () => {
    setDetails((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        product: '',
        price: '',
        qty: '',
        amount: '',
      },
    ]);
  };

  return (
    <>
      <Typography variant="h5" component="div">
        구매 입력
      </Typography>
      <Typography variant="h5" component="div">
        구매 마스터
      </Typography>

      <Card sx={{ minWidth: 275, marginBottom: 3 }}>
        <CardContent>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                <TableRow>
                  <TableCell align="center">구매순번</TableCell>
                  <TableCell align="center">
                    <Common.TextField />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">구매일자</TableCell>
                  <TableCell align="center">
                    <Common.DateField />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">구매회원</TableCell>
                  <TableCell align="center">
                    <Common.TextField disabled />
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
        <Table sx={{ minWidth: 650 }}>
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
                  </select>
                </TableCell>

                <TableCell align="center">
                  <Common.NumberField disabled />
                </TableCell>

                <TableCell align="center">
                  <Common.NumberField />
                </TableCell>

                <TableCell align="center">
                  <Common.NumberField disabled />
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
