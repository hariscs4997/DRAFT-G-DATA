/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */

'use client';

import { Column, useTable } from 'react-table';
import React, { useEffect } from 'react';
import { Columns } from '@/types';
import NoData from '@/components/UI/NoDataMessage';

interface IProps {
  data: any;
  columns: Column<Columns>[];
}

function Table({ columns, data }: IProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  useEffect(() => {
    // Add any side effects based on data changes if needed
  }, [data]);
  return (
    <table {...getTableProps()} className="w-full -mt-2">
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                {...column.getHeaderProps()}
                className={`border-table dark:border-white border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap ${column.id === 'id' && 'hidden'
                  }`}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {data.length > 0 ? <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
              {row.cells.map((cell: any) => (
                <td
                  key={cell.id}
                  {...cell.getCellProps()}
                  className={`border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center
                  `}
                >
                  {cell.column.id === 'total'
                    ? (row.original.total = row.original.quantity * row.original.price)
                    : cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody> : <NoData />}
    </table>
  );
}

export default Table;
