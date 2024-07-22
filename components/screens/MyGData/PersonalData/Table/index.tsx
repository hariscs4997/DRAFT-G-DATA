import React from 'react';
import { Column, useTable } from 'react-table';
import { Columns } from '@/types';
import Image from '@/components/UI/StyledImage';

interface IProps {
  data: any;
  columns: Column<Columns>[];
}

function Table({ columns, data }: IProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                {...column.getHeaderProps()}
                className="border-table border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={row.id}
              className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat"
            >
              {row.cells.map((cell: any) => (
                <td
                  key={cell.id}
                  {...cell.getCellProps()}
                  className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center min-w-[200px] dark:text-main"
                >
                  {cell.column.id === 'photos' && row.values.photos && typeof row.values.photos === 'string' && (
                    <Image src={row.values.photos} alt="image" className="w-[550px] h-[250px]" />
                  )}
                  {cell.column.id === 'photos' &&
                    row.values.photos &&
                    typeof row.values.photos === 'object' &&
                    row.values.photos.map(({ file_url }: { file_url: string }) => (
                      <Image src={file_url} alt="image" className="min-w-[300px] h-[250px] max-w-[300px]" />
                    ))}
                  {cell.column.id !== 'photos' && cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
