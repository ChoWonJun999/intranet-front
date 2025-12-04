import { Box, Button, Stack, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  DataGrid,
  // GRID_CHECKBOX_SELECTION_COL_DEF,
  type GridColDef,
} from '@mui/x-data-grid';
import { koKR } from '@mui/x-data-grid/locales';
import ExcelJS from 'exceljs';
import { useNavigate } from 'react-router-dom';

import { saveAs } from 'file-saver';

const theme = createTheme(
  {
    // 기본 테마 설정
  },
  koKR // 한국어 로케일 적용
);

interface RowType {
  id?: never;
  [key: string]: any;
}

export default function CustomTable(props: { columns: any; rows: RowType[] }) {
  const navigate = useNavigate();

  const handleNewClick = () => navigate('./add');

  const rows = props.rows.map((row: any, index: number) => ({
    id: index + 1,
    ...row,
  }));

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'id',
      headerName: '번호',
      valueGetter: (_value, row, c, d) => row.id,
      width: 90,
      sortable: true,
      editable: false,
      filterable: false,
      hideable: false,
      headerAlign: 'center',
      align: 'center',
      resizable: true,
      disableColumnMenu: true,
    },
    ...props.columns.map((col: any) => ({
      headerAlign: 'center',
      width: 150,
      ...col,
    })),
    /*
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 100,
    },
     */
  ];

  const uploadExcel = async () => {};
  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // 헤더 생성
    worksheet.addRow(columns.map((col) => col.headerName ?? col.field));

    // 데이터 생성
    rows.forEach((row) => {
      worksheet.addRow(columns.map((col) => row[col.field]));
    });

    // 컬럼 너비 적용 (선택)
    columns.forEach((col, index) => {
      worksheet.getColumn(index + 1).width = (col.width ?? 120) / 8;
    });

    // EXCEL 파일 생성
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, 'export.xlsx');
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography variant="h5" component="div">
          조회 결과 <span style={{ fontSize: '15px' }}> {rows.length}건</span>
        </Typography>
        <Stack spacing={1} direction="row">
          <Button
            variant="contained"
            onClick={handleNewClick}
            sx={{ padding: '0px 10px !important' }}
          >
            신규입력
          </Button>
          <Button variant="contained" onClick={uploadExcel} sx={{ padding: '0px 10px !important' }}>
            엑셀 업로드
          </Button>
          <Button
            variant="contained"
            onClick={downloadExcel}
            sx={{ padding: '0px 10px !important' }}
          >
            엑셀 다운로드
          </Button>
        </Stack>
      </Box>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          density="compact"
          // hideFooter={true}
          // checkboxSelection
          disableRowSelectionOnClick
          // disableColumnSorting // header
          // disableColumnMenu // header

          disableColumnFilter

          // showToolbar
        />
      </ThemeProvider>
    </>
  );
}
