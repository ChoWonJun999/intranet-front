import Buttons from 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.html5.js';
import DataTable from 'datatables.net-dt';
import JSZip from 'jszip';
import { useEffect, useRef } from 'react';
import './DataTables.css';

DataTable.use(Buttons);
(DataTable as any).Buttons.jszip(JSZip);

export default function CustomTable(props: { columns: any; data: any; buttonProps: any }) {
  const tableRef = useRef<HTMLTableElement>(null);

  const columns = [
    {
      width: '70px',
      name: '번호',
      render: (_data: any, _type: any, _row: any, meta: { row: number }) => meta.row + 1,
    },
    ...props.columns,
  ];

  useEffect(() => {
    new DataTable(tableRef.current!, {
      columns: columns,
      data: props.data,
      destroy: true,
      ordering: false,
      searching: false,
      paging: false,
      info: false,
      layout: {
        topStart: [
          {
            div: {
              html: '<h2>조회 결과</h2>',
            },
          },
          {
            div: {
              html: '<h4>' + props.data.length + '건</h4>',
            },
          },
        ],
        topEnd: {
          buttons: [
            {
              text: '<i class="fa fa-plus">+</i> 신규입력',
              className: 'btnsty_blue',
              action() {
                alert('Clicked!');
              },
            },
            {
              extend: 'excelHtml5',
              text: '<i class="fa fa-upload"></i> 엑셀 업로드',
              className: 'btnsty_blue',
            },
            {
              extend: 'excelHtml5',
              text: '<i class="fa fa-download"></i> 엑셀 다운로드',
              className: 'btnsty_blue',
            },
          ],
        },
      },
    });
  }, []);

  return (
    <table ref={tableRef}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th>{column.name}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
}
