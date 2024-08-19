'use client'
import React, { memo, useState } from 'react';
import Modal from 'react-modal';
import { buy_icon as sell_icon, close_icon } from '@/public/assets';
import { INTERESTEDCOMPANYDATACOLUMNS } from '@/constants';
import IconButton from '@/components/UI/IconButton';
import { useTable } from 'react-table';
import NoData from '@/components/UI/NoDataMessage';

interface IProp {
  interestedCompanies: any;
  isShow: boolean
  onClose: () => void;
  sellConsentToCompany: (consent: any) => Promise<void>
}
function InterestedCompanies({ interestedCompanies, isShow, onClose, sellConsentToCompany }: IProp) {

  const [isTransactionLoading, setIsTransactionLoading] = useState(false)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: INTERESTEDCOMPANYDATACOLUMNS,
    data: interestedCompanies
  });

  return (
    <Modal
      isOpen={isShow}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      ariaHideApp={false}
    >
      <div className="mx-auto rounded-md">
        <IconButton className='relative w-4 h-4 mobile:w-[15px] mobile:h-[15px] dark:invert-[1]'
          src={close_icon}
          onClick={onClose}
          disabled={isTransactionLoading}
        />
        <h1 className="text-2xl my-4 text-[#001F12] dark:text-white text-center">
          Interested Company
        </h1>
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
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
          {interestedCompanies.length > 0 ?
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

                        <p>{row.original.offered_by && (`${row.original.offered_by.first_name} ${row?.original.offered_by.last_name}`)}
                        </p>
                      ) : cell.column.id === 'email' ? (
                        <p>{row.original.offered_by.email}</p>
                        ) : cell.column.id === 'amount_offered' ? (
                          <p>{row.original.amount_offered}</p>
                        )
                          : cell.column.id === 'sell' ? (

                        <IconButton className='relative w-7 h-7 mobile:w-[15px] mobile:h-[15px] dark:invert-[1]'
                          src={sell_icon}
                          disabled={isTransactionLoading}
                          onClick={async () => {
                            setIsTransactionLoading(true)
                            await sellConsentToCompany(row.original)
                            setIsTransactionLoading(false)
                          }}
                        />
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
            </tbody> :
            <NoData message='No interested companies to show.' />
          }
        </table>
      </div>
    </Modal>
  );
}

export default memo(InterestedCompanies);
