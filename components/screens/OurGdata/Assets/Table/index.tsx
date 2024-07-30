'use client';

import React from 'react';
import { Column, useTable } from 'react-table';
import { Columns } from '@/types';
import NoData from '@/components/UI/NoDataMessage';
import Skeleton from '@/components/UI/LazyLoader';

interface IProps {
  data: any;
  columns: Column<Columns>[];
  isLoadingData: boolean
}

function Table({ columns, data, isLoadingData }: IProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });


  return (
    <>
      {isLoadingData ?
        <Skeleton /> :
        <table {...getTableProps()} className="w-full -mt-2">
          <thead>
            {headerGroups.map((headerGroup: any, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
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
          {data.length > 0 ?
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any, index) => {
                prepareRow(row);
                return (
                  <tr key={index} {...row.getRowProps()} className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
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
      }
    </>
  );
}

export default Table;
