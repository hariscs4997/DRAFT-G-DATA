'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Modal from '@/components/UI/ModalDraft';
import { buy_icon } from 'public/assets';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import IconButton from '@/components/UI/IconButton';
import { useFormik } from 'formik';
import { maxWidth } from '@/constants';
import { useConsentActions } from '@/hooks/useConsentActions';
import { BUYDATACOLUMNS } from '@/constants/consent';
import { useTable } from 'react-table';
import { ConsentBuyFormSchema } from '@/schema';
import { TCompanyConsentDeals } from '@/types';
import Skeleton from '@/components/UI/LazyLoader';



function Main() {
  const { getCompanyConsentsDeals, createBuyConsentOffer, isLoading } = useConsentActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsentId, setSelectedConsentId] = useState<number | undefined>()
  const [tableData, setTableData] = useState<TCompanyConsentDeals[]>([]);

  const { handleSubmit, handleChange, values, touched, errors, resetForm, isSubmitting } = useFormik({
    initialValues: { amount: '' },
    validationSchema: ConsentBuyFormSchema,
    onSubmit: async (results, onSubmit) => {
      if (isMaxAmountError) return;
      onSubmit.setSubmitting(true);
      const response = await createBuyConsentOffer({
        user_consent_deal_id: selectedConsentId!,
        amount_offered: Number(results.amount),
      });
      // console.log('Order', response);
      closeModal()
      onSubmit.setSubmitting(false);
    },
  });

  const { isMaxAmountError, errorMessage } = useMemo(() => {
    const consent = tableData.find((consent) => consent.id === selectedConsentId)
    if (!consent || Number(values.amount) <= consent.total)
      return {
        isMaxAmountError: false,
        errorMessage: ''
      }
    return {
      isMaxAmountError: true, errorMessage: `Amount should be less than ${consent.total}`
    }
  }, [selectedConsentId, values.amount]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: BUYDATACOLUMNS,
    data: tableData,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConsentId(undefined)
    resetForm()
  };

  useEffect(() => {
    getCompanyConsentsDeals().then((data) => {
      const tableData: TCompanyConsentDeals[] = data.map((item: any) => ({
        price: item.amount,
        id: item.id,
        name: item.personal_data_field.field_name,
        quantity: item.quantity,
        status: item.status,
        total: item.quantity * parseFloat(item.amount),
      }));
      setTableData(tableData);
    })
  }, []);

  return (
    <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
      {isLoading ?
        <Skeleton /> :
      <table {...getTableProps()} className="w-full overflow-auto">
        <thead>
            {headerGroups.map((headerGroup: any, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  className={`border-table dark:border-white border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap ${column.id === 'id' && 'hidden'}`}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row: any, index) => {
            prepareRow(row);
            return (
              <tr
                key={index}
                {...row.getRowProps()}
                className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat"
              >
                {row.cells.map((cell: any) => (
                  <td
                    key={cell.id}
                    {...cell.getCellProps()}
                    className="border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center"
                  >
                    {cell.column.id === 'buy' ? (
                      <IconButton className='relative h-[25px] w-[25px] mobile:w-[15px] mobile:h-[15px] dark:invert-[1]'
                        src={buy_icon}
                        onClick={() => {
                          setSelectedConsentId(row.original.id)
                          openModal(); 
                        }}
                        disabled={row.original.status === 'interested' || row.original.status === 'purchased'}
                      />

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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Do you really want to buy?"
      >
        <form className="flex flex-col justify-center items-center gap-y-4 w-full" noValidate onSubmit={handleSubmit}>
          <Input
            label='Amount'
            placeholder="0.00"
            name="amount"
            error={(touched.amount && errors.amount) || (isMaxAmountError && errorMessage)}
            className="w-full"
            value={values.amount}
            onChange={(e) => {
              //regex to accept only numbers
              if (/^\d*$/.test(e.target.value)) {
                handleChange(e)
              }
            }}
          />
          <div className='flex w-full gap-x-3'>
            <Button
              type="submit"
              title='Yes'
              className="bg-[#046C98] py-2 px-6 w-full max-w-[150px]"
              isLoading={isSubmitting}
            />
            <Button
              type="button"
              title='No'
              className="bg-[#F5B11A] py-2 px-6 w-full max-w-[150px]"
              onClick={closeModal}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Main;
