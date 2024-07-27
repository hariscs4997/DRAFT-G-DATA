'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { maxWidth, TODAY, YESTERDAY } from '@/constants';
import { DATATABLECOLUMNS } from '@/constants/consent';
import Skeleton from '@/components/UI/LazyLoader';
import useSocket from '@/hooks/useSocket';
import { Socket } from 'socket.io-client';
import { useTable } from 'react-table';
import { trade_icon } from '@/public/assets';
import Link from 'next/link';
import Image from 'next/image';
import { PATHS } from '@/constants/navigation';
import { slugify } from '@/lib';

function Main() {
  const [tableData, setTableData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: DATATABLECOLUMNS,
    data: tableData
  });

  const onConnect = useCallback((socket: Socket) => {
    socket.emit('consent_averages', {
      interval: [TODAY, YESTERDAY],
    });
  }, []);

  const eventHandlers = useMemo(() => ({
    consent_averages: (data: any) => {
      if (data && data.data) {
        setTableData(
          data.data.map((item: any) => ({
            name: item.field_name,
            price: item.average_price,
          })),
        );
        if (isLoading) setIsLoading(false);
      }
    },
  }), [isLoading]);

  useSocket('market_place', eventHandlers, onConnect);



  return (
    <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
      {isLoading ?
        <Skeleton /> :
        <table {...getTableProps()} className="w-full">
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
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
                  {row.cells.map((cell: any) => (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className="border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center"
                    >
                      {cell.column.id === 'action' ? (
                        <Link
                          href={`${PATHS.CHART}/${slugify(cell.row.original.name)}`}
                          className="mx-auto block w-[25px] h-[25px]"
                        >
                          <Image
                            src={trade_icon}
                            alt="alt"
                            className="dark:invert-0 dark:brightness-100"

                          />
                        </Link>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </div>
  );
}
export default Main;