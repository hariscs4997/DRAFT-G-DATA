/* eslint-disable no-nested-ternary */

'use client';

import React, { useEffect, useState } from 'react';
import { Column, useTable } from 'react-table';
import { Columns } from '@/types';
import { LineChart } from '@/components/UI/LineChart2';
import { trade_icon, buy_icon, loader_icon } from '@/public/assets';
import Link from 'next/link';
import Image from 'next/image';
import { TransactionData } from '@/hooks/useConsentActions';
import Modal from '@/components/UI/ModalDraft';
import { useTableData } from '@/state/table/hook';
import { PATHS } from '@/constants/navigation';
import { slugify } from '@/lib';
import Button from '@/components/UI/Button';



interface IProps {
  data: any;
  columns: Column<Columns>[];
  personalId?: any
  isClose?: () => void;
}

function Table({ columns, data, personalId, isClose }: IProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { fetchTableData } = useTableData();
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  const [sellData, setSellData] = useState(0);
  // const { selectedCompany, transactionDetails, fetchInterestedCompany } = useConsentBuy();

  const closeModal = () => {
    setIsOpenModal(false);
  }

  const handleClick = () => {
    if (transactionData) {
      const { user_consent_deal_id: userConsentDealID, amount_offered: amountOffered, status } = transactionData;
      const amountOfferedNumber = Number(amountOffered);
      //   transactionDetails(
      //     {
      //       personal_data_field_id: personalId.personalId,
      //       seller_id: userConsentDealID,
      //       amount: amountOfferedNumber, // Use the converted amount
      //       qunatity: personalId.quantity,
      //       status,
      //     },
      //   );
      // }
    }
    fetchTableData();
    if (isClose) isClose();
  }
  const handleSellClick = async (id: any) => {
    console.log('id :>> ', id);
    // selectedCompany(id);
    // fetchInterestedCompany(personalId?.id);
    handleClick();
  };

  const [clickedRow, setClickedRow] = useState<number | null>(null); 

  useEffect(() => {
    if (transactionData) {
      const { user_consent_deal_id: userConsentDealID, amount_offered: amountOffered, status } = transactionData;
      const amountOfferedNumber = Number(amountOffered); // Convert amountOffered to a number
      // transactionDetails({
      //   personal_data_field_id: personalId.personalId,
      //   seller_id: userConsentDealID,
      //   amount: amountOfferedNumber, // Use the converted amount
      //   qunatity: personalId.quantity,
      //   status: status?.toUpperCase(),
      // });
    }
  }, [transactionData]);

  return (
    <>
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
                    {cell.column.id === 'graph' && (
                      <div className="max-w-[80px] justify-center items-center flex">
                        <LineChart data={row.original.chardata} color="green" />
                      </div>
                    )}
                    {cell.column.id === 'action' ? (
                      <Link
                        href={`${PATHS.CHART}/${slugify(cell.row.original.name)}`}
                        className="justify-center items-center flex"
                        onClick={() => setClickedRow(row.index)}
                      >
                        <Image
                          src={clickedRow === row.index ? loader_icon : trade_icon}
                          alt="alt"
                          className="cursor-pointer w-[25px] h-[25px] dark:invert-0 dark:brightness-100"

                        />
                      </Link>
                    ) : cell.column.id === 'name' ? (
                      row?.original?.offered_by ?
                        (`${row.original?.offered_by.first_name} ${row?.original.offered_by.last_name}`) :
                        (row.original.name)

                    ) : cell.column.id === 'email' ? (
                      row.original.offered_by.email
                    ) : cell.column.id === 'sell' ? (
                      <button
                        type='button'
                        onClick={() => {
                          setTransactionData(row.original);
                          setSellData(row.original.id);
                          setIsOpenModal(true);
                          handleSellClick(row.original.id);
                        }}
                        className="justify-center items-center flex mx-auto"
                      >
                        <Image
                          src={buy_icon}
                          alt="alt"
                                className="cursor-pointer w-[30px] h-[35px] dark:invert-0 dark:brightness-100 justify-center flex items-center"
                        />
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
      <Modal
        isOpen={isOpenModal}
        onClose={closeModal}
        title="Do you really want to sell?"
      >
        <div className='flex w-full gap-x-3'>
          <Button
            title='Yes'
            className="bg-[#046C98] py-2 px-6 w-full max-w-[150px]"
            isLoading={false}
            onClick={() => {
              handleSellClick(sellData);
              closeModal();

            }}
          />
          <Button
            title='No'
            className="bg-[#F5B11A] py-2 px-6 w-full max-w-[150px]"
            onClick={closeModal}
          />
        </div>
      </Modal>
    </>
  );
}

export default Table
