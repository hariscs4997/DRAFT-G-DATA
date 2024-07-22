/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-named-as-default

'use client';

import { useTable } from 'react-table';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import Modals from '@/components/UI/Modal';
import { delete_icon } from '@/public/assets';
import Image from 'next/image';
import { useTableData } from '@/state/table/hook';
import { SELLDATACOLUMNS } from '@/constants/consent';
import { useBuyData } from '@/hooks/useBuy';
import { usePathname } from 'next/navigation';
import { usePersonalData } from '@/state/myGData/hooks';
import { convertToTitleCase } from '@/lib/index';
import { useSellValue } from '@/state/sell/hook';
import ModalTable from '../ModalTable';


function Table({ data }: any) {
  const { theme } = useTheme();
  const { fetchTableData } = useTableData();
  const { fetchInterestedCompany } = useBuyData();
  const pathname = usePathname();
  const title2 = pathname.split('/');
  const titleValue = title2[title2.length - 2];
  const title = convertToTitleCase(titleValue.charAt(0) + titleValue.slice(1).toLowerCase());
  const { rData } = usePersonalData();
  const { fetchSellData } = useSellValue();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: SELLDATACOLUMNS,
    data,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [isInterested, setIsInterest] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [personal, setPersonal] = useState({
    personalId: 0,
    quantity: 0,
    id: 0,
  });


  const closeModal = () => {
    setIsOpen(false);
    setIsInterest(false);

  };
  useEffect(() => {
    fetchTableData();
  }, [data]);

  const { deleteRowFromTable } = useTableData();

  const handleDeleteRow = async (key: number) => {
    deleteRowFromTable(key);
    await fetchTableData();
    await fetchSellData(title, rData);
    closeModal();
  };
  const handleStatusClick = async (id: any) => {
    const data = await fetchInterestedCompany(id);
    setModalData(data);
    setIsInterest(true);
  };

  return (
    <>
      {isOpen && (
        <Modals
          isOpen={isOpen}
          closeModal={closeModal}
          handleActionClick={() => handleDeleteRow(index)}
          title="Do you want to delete?"
        />
      )}
      {isInterested && (
        <ModalTable
          openModal={isInterested}
          isClose={closeModal}
          value="Interested Company"
          data={modalData}
          id={personal}
        />
      )}

      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  className={`border-table dark:border-white border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap ${column.id === 'id' && 'hidden'
                    // eslint-disable-next-line @typescript-eslint/indent
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
                      <button
                        className={`${row.original.status !== 'purchased' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        type="submit"
                        onClick={() => {
                          setIndex(row.original.id);
                          setIsOpen(true);

                        }}
                        disabled={row.original.status === 'purchased'}
                      >
                        <Image
                          src={delete_icon}
                          alt="alt"
                          className="w-[25px] h-[25px] dark:invert-0 dark:brightness-100 dark:filter-1 dark:inset-0"
                          style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
                        />
                      </button>
                    ) : cell.column.id === 'total' ? (
                      row.original ?
                        (
                          row.original.amount * row.original.quantity
                        ) : ''

                    ) :
                      cell.column.id === 'name' ? (
                        row.original ?
                          (
                            row.original.
                              personal_data_field.field_name
                          ) : null

                      ) :
                        cell.column.id === 'status' ? (
                          <button type="button" className={`${row.original.status === 'interested' ? 'cursor-pointer' : 'cursor-not-allowed'}`} disabled={row.original.status !== 'interested'} onClick={() => {
                            // console.log(row.original)
                            setPersonal({
                              personalId: row.original.personal_data_field_id,
                              quantity: row.original.quantity,
                              id: row.original.id,
                            });
                            if (row.original) handleStatusClick(row.original.id);
                          }}>
                            {row.original.status}
                          </button>
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
    </>
  );
}

export default Table;
