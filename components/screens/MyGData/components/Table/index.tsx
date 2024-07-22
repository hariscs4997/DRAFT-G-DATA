/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
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
                key={column.id}
                {...column.getHeaderProps()}
                className="border-table border py-3 px-7 mobile:px-3 mobile:py-2 bg-table text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap min-w-[250px]"
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
            <tr {...row.getRowProps()} className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
              {row.cells.map((cell: any) => (
                <td
                  key={cell.id}
                  {...cell.getCellProps()}
                  className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black dark:text-main font-sans font-normal text-base mobile:text-sm text-center "
                >
                  {cell.column.id === 'Consent' ||
                  cell.column.id === 'Consent Value' ||
                  cell.column.id === 'Rewards' ||
                  row.values.Consent !== 'Photos'
                    ? cell.render('Cell')
                    : row.values[cell.column.id] &&
                      row.values[cell.column.id].length > 0 &&
                      row.values[cell.column.id].map(({ file_url }: { file_url: string }) => (
                        <Image src={file_url} alt="photo" className="min-w-[300px] h-[250px] max-w-[300px]" />
                      ))}
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
