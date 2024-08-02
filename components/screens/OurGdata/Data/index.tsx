'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { maxWidth, TODAY, YESTERDAY } from '@/constants';
import { DATATABLECOLUMNS } from '@/constants/consent';
import useSocket from '@/hooks/useSocket';
import { useTable } from 'react-table';
import { trade_icon } from '@/public/assets';
import Link from 'next/link';
import Image from 'next/image';
import { PATHS } from '@/constants/navigation';
import { capitalize, slugify } from '@/lib';
import { Socket } from 'socket.io-client';
import NoData from '@/components/UI/NoDataMessage';
import Loader from '@/components/UI/Loader';
import { useOurGData } from '@/state/ourGData/hooks';

function Main() {
  const { liveConsentData, setLiveConsentData } = useOurGData()
  const [isLoading, setIsLoading] = useState(liveConsentData.length === 0);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: DATATABLECOLUMNS,
    data: liveConsentData as any
  });

  const eventHandlers = useMemo(() => ({
    consent_averages: (data: any) => {
      if (data && data.data) {
        setLiveConsentData(
          data.data.map((item: any) => ({
            name: capitalize(item.field_name),
            price: `$${item.average_price}`,
          })).filter((item: any) => item.name != "Date"),
        );
        if (isLoading) setIsLoading(false);
      }
    },
  }), [isLoading]);

  const onConnect = useCallback((socket: Socket) => {
    socket.emit('consent_averages', {
      interval: [TODAY, YESTERDAY]
    })
  }, [])

  useSocket('market_place', eventHandlers, onConnect);
  return (
    <div className={`overflow-auto w-full h-full max-w-[${maxWidth}]`}>
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup: any, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, index: number) => (
                  <th
                    key={index}
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
        {liveConsentData.length > 0 ? 
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any, index) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()} className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
                  {row.cells.map((cell: any) => (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className="border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center"
                    >
                      {cell.column.id === 'action' ? (
                        <Link
                          href={`${PATHS.DATA}/${slugify(cell.row.original.name)}`}
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
          </tbody> :
          !isLoading && <NoData />
        }
      </table>
      {isLoading && <div className='flex justify-center mt-[200px]'><Loader className='w-10 h-10' /></div>}
    </div>
  );
}
export default Main;