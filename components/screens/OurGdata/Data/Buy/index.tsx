'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DATATABLEDATA } from '@/temp';
import { useTable } from 'react-table';
import Modal from '@/components/UI/Modal';
import Image from 'next/image';
import buy_icon from '@/public/icons/buy_icon.png';
import { useBuyData } from '@/hooks/useBuy';
import { BUYDATACOLUMNS } from '@/constants/consent';
import { maxWidth } from '@/constants';
import { useTheme } from '@/context/ThemeProvider';

type BuyData = {
  price: number;
  id: string;
  name: string;
  unit: number;
  status: string;
  total: number;
 
};

function Main() {
  const pathname = usePathname();
  const title = pathname.split('/');
  const titleValue = title[title.length - 2];
  const [tableData, setTableData] = useState<BuyData[]>([]);
  const { fetchBuyData, fetchBuyDetails } = useBuyData();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    id: '',
    amount: 0
  });
  const { theme } = useTheme();
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    fetchData()
  };
  const fetchData = async () => {
    try {
      const buyData = await fetchBuyData();
      const newData: BuyData[] = buyData.data.map((item: any) => ({
        price: item.amount,
        id: item.id,
        name: item.personal_data_field.field_name,
        quantity: item.quantity,
        status: item.status,
        total: item.quantity * parseFloat(item.amount),

      }));
      setTableData(newData);
    } catch (error) {
      console.error('Error fetching buy data:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, [fetchBuyData]);

  const handleBuy = async (id: string, total: number) => {
    try {
      const buyDetail = await fetchBuyDetails({
        user_consent_deal_id: parseInt(id), 
        amount_offered: total 
      });
      console.log('Buy detail:', buyDetail);
      closeModal();
      fetchData()
    } catch (error) {
      console.error('Error fetching buy details:', error);
    }
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: BUYDATACOLUMNS, 
    data: tableData
  });

  return (
    <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          handleActionClick={() => handleBuy(data.id, data.amount)} // Pass function reference
          title="Do you really want to buy?"
          amount={true}
          amountValue={data}
        />
      )}
      <table {...getTableProps()} className="w-full overflow-auto">
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  className={`border-table dark:border-white border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap ${
                    column.id === 'id' && 'hidden'
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
              <tr
                {...row.getRowProps()}
                className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat"
              >
                {row.cells.map((cell: any) => (
                  <td
                    key={cell.id}
                    {...cell.getCellProps()}
                    className={`border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center`}
                  >
                    {cell.column.id === 'buy' ? (
                      <button
                      className={`${row.original.status==='purchased'||row.original.status==='interested'?"cursor-not-allowed":"cursor-pointer"}`}
                        type="submit"
                        onClick={() => {
                          const rowData = row.original; // Get the row data
                          setData({
                            id: rowData.id,
                            amount: rowData.total
                          });
                          openModal(); // Open modal after setting data
                        }}
                        disabled={row.original.status==="interested"||row.original.status==="purchased"}
                      >
                        <Image
                          src={buy_icon}
                          alt="alt"
                          className="w-[25px] h-[25px] dark:invert-0 dark:brightness-100 dark:filter-1 dark:inset-0"
                          style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
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
    </div>
  );
}

export default Main;
