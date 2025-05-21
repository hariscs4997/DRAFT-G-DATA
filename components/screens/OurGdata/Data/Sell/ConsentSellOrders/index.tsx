'use client';

import React, { memo, useState } from 'react';
import { useTable } from 'react-table';
import Modal from '@/components/UI/ModalDraft';
import { delete_icon } from '@/public/assets';
import { SELLDATACOLUMNS } from '@/constants/consent';
import Button from '@/components/UI/Button';
import IconButton from '@/components/UI/IconButton';
import { TUserConsentDeals } from '@/types';
import Skeleton from '@/components/UI/LazyLoader';
import NoData from '@/components/UI/NoDataMessage';
import { convertToTitleCase } from '@/lib';
import { Tooltip as ReactTooltip } from "react-tooltip";

interface IProps {
  isLoadingData: boolean;
  data: TUserConsentDeals[]
  handleDeleteSellOrder: (orderId: number) => Promise<void>
  handleSelectConsent: (consent: any) => Promise<void>
}

function ConsentSellOrders({ data, isLoadingData, handleDeleteSellOrder, handleSelectConsent }: IProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | undefined>();
  const [isDeletingOrder, setIsDeletingOrder] = useState(false)
  const [isLoadingInterestedCompanies, setIsLoadingInterestedCompanies] = useState(false)


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: SELLDATACOLUMNS,
    data: data.map((item) => {
      return { ...item, status: item.status === 'in_process' ? "in process" : item.status }
    }),
  });


  const handleConfirmDelete = async () => {
    if (!selectedOrderId) return;
    setIsDeletingOrder(true)
    await handleDeleteSellOrder(selectedOrderId);
    setIsDeletingOrder(false)
    closeModal();
  };

  const handleSelecOrderToDelete = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      {isLoadingData ?
        <Skeleton />
        :
        <table {...getTableProps()} className="w-full relative min-h-[250px]">
          <thead>
            {headerGroups.map((headerGroup: any, index) => (
              <tr key={index}  {...headerGroup.getHeaderGroupProps()}>
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
                        className="border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center"
                      >

                        {cell.column.id === 'name' ? (
                          <p>
                            {row.original ?
                              convertToTitleCase(row.original.personal_data_field.field_name)
                              : null}
                          </p>
                        ) :
                          cell.column.id === 'total' ? (
                            <p>
                              {row.original ? row.original.amount * row.original.quantity : ''}
                            </p>

                          ) :
                            cell.column.id === 'action' ? (
                              <IconButton className='relative h-[25px] w-[25px] mobile:w-[15px] mobile:h-[15px] dark:invert-[1]'
                                src={delete_icon}
                                onClick={() => handleSelecOrderToDelete(row.original.id)}
                                disabled={row.original.status === 'purchased'}
                              />
                            ) :
                              cell.column.id === 'status' ? (
                                <>
                                  <div
                                    data-tooltip-id={"tooltip-" + index}
                                  >
                                    <Button type="button"
                                      className='text-black font-normal text-base capitalize underline'
                                      title={row.original.status}
                                      disabled={row.original.status != 'interested' || isLoadingInterestedCompanies} onClick={async () => {
                                        setIsLoadingInterestedCompanies(true)
                                        await handleSelectConsent(row.original)
                                        setIsLoadingInterestedCompanies(false)
                                      }} />
                                  </div>
                                  <ReactTooltip
                                    id={"tooltip-" + index}
                                    place="bottom"
                                    content={row.original.status === 'pending' ? 'Waiting for a buyer to show interest for this consent record' : row.original.status === 'purchased' ? 'This consent record has been sold' : row.original.status === 'in process' ? 'Waiting for buyer to complete the order' : 'View a list of interested companies for this consent record'}
                                  />
                                </>
                              ) : (
                                cell.render('Cell')
                              )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody> :
            <NoData />
          }
        </table>
      }
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Do you want to delete?"
        className='py-3'
      >
        <div className="flex gap-x-4 my-4 w-full justify-center items-center">
          <Button
            onClick={handleConfirmDelete}
            className="bg-blue w-full disabled:bg-disabledBlue max-w-[250px]"
            title="Yes"
            isLoading={isDeletingOrder}
          />
          <Button
            type="button"
            className="bg-[#F5B11A] w-full max-w-[250px]"
            title="No"
            onClick={closeModal}
            disabled={isDeletingOrder}
          />
        </div>
      </Modal>
    </>
  );
}

export default memo(ConsentSellOrders);