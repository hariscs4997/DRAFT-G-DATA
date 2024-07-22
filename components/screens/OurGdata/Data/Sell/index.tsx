/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-return-assign  */

'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/components/UI/Input';
import { maxWidth } from '@/constants';
import Button from '@/components/UI/Button';
import { SELLINITIALVALUES } from '@/constants/auth';
import { SellFormSchema } from '@/schema';
import { usePersonalData } from '@/state/myGData/hooks';
import { useFormik } from 'formik';
import { useSellData, PERSONALData } from '@/hooks/useSell';
import { convertToTitleCase } from '@/lib/index';
import { useTableData } from '@/state/table/hook';
import { io } from 'socket.io-client';
import moment from 'moment';
import { useSellValue } from '@/state/sell/hook';
import { usePathname, useRouter } from 'next/navigation';
import Modals from '@/components/UI/Modal';
import Table from './Table';
import TablePopUp from './TablePopUp';



function Main() {
  const pathname = usePathname();
  const { rData } = usePersonalData();
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { fetchData } = useSellData();
  const { tableData, addRowToTable, fetchTableData } = useTableData();
  const { fetchSellData, sellData } = useSellValue();
  const [price, setPrice] = useState(0);
  const title2 = pathname.split('/');
  const titleValue = title2[title2.length - 2];
  const [open, setOpen] = useState(false);
  const title = convertToTitleCase(titleValue.charAt(0) + titleValue.slice(1).toLowerCase());
  const socket = io(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}market_place`, {
    transports: ['websocket', 'polling'],
    reconnection: true,
  });
  const fetchDataSetData = async () => {
    const title2 = pathname.split('/');
    const titleValue = title2[title2.length - 2];
    const title = convertToTitleCase(titleValue.charAt(0) + titleValue.slice(1).toLowerCase());
    await fetchSellData(title, rData);
  };
  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const title2 = pathname.split('/');
      const titleValue = title2[title2.length - 2];
      const title = convertToTitleCase(titleValue.charAt(0) + titleValue.slice(1).toLowerCase());
      await fetchSellData(title, rData);

    };
    if (!(sellData.consent_name.length < 0)) {
      fetchDataAndSetData();

    }

  });
  let validation = true;
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    setFieldValue,
    isValid,
  } = useFormik({
    initialValues: {
      ...SELLINITIALVALUES,

    },
    validationSchema: SellFormSchema,
    onSubmit: async (results: any, onSubmit: any) => {
      if (isValid) {
        const name: any = rData[title];
        const { limitPrice, amount } = values;
        const sellValues: PERSONALData = {
          personal_data_field_id: name.id,
          amount,
          qunatity: limitPrice,
        };
        const data = await fetchData(sellValues);
        const table = {
          personal_data_field: { field_name: title },
          status: data.data.status,
          quantity: data.data.qunatity,
          amount: data.data.amount,
        };
        addRowToTable(table);
        await fetchDataSetData();
      }
    },
  },
  );
  useEffect(() => {
    const newTotal =
      values?.amount &&
      values.limitPrice &&
      (values.amount * values.limitPrice || 0);
    setTotal(newTotal || 0);
  }, [values?.amount, values?.limitPrice, tableData]);

  const handleMaxButtonClick = () => {
    setFieldValue('limitPrice', sellData.available_data_count || '');
    const value =
      sellData.available_data_count && values.amount ? sellData.available_data_count * values.amount : 0;
    setFieldValue('total', value);
  };
  const redirectToNewPath = () => {
    const pathSegments = pathname.split('/');
    const newPathSegments = pathSegments.slice(0, -1);
    setFieldValue('total', '');
    setFieldValue('amount', '');
    setFieldValue('limitPrice', '');
    const newPath = newPathSegments.join('/');
    router.push(`${newPath}`);
  };

  const handleLimitPriceChange = (e: any) => {
    handleChange(e);
    setTimeout(() => {
      const newLimitPrice = e.target.value;
      if (!Number.isNaN(newLimitPrice) && values?.amount) {
        const newTotal = newLimitPrice * values?.amount;
        setFieldValue('total', newTotal);
      } else {
        setFieldValue('total', 0.0);
      }
    }, 0);
  };
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('consent_averages', {
        interval: [
          moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'),
          moment().format('YYYY-MM-DD 00:00:00'),
        ],
      });
    });

    socket.on('consent_averages', (data) => {
      if (data) {
        const valueprice = data?.data?.find((item: any) => item.field_name === titleValue);
        const averagePrice = valueprice?.average_price || 0;
        setPrice(averagePrice);
        setFieldValue('amount', averagePrice);
      }
    });
    fetchDataSetData();
    fetchTableData();
  }, []);

  const [tableOpen, setTableOpen] = useState(false);
  const handleClick = () => {
    if (values.limitPrice! < sellData.available_data_count) {
      setTableOpen(true);
    }
  };
  const SellTitle = decodeURIComponent(sellData.consent_name);
  console.log(SellTitle);
  return (
    <>{
      tableOpen && (<TablePopUp openModal={tableOpen}
        isClose={() => {
          setTableOpen(!tableOpen);
          // Call isClose function if it exists
        }}

        data2={sellData}
      />)
    }

      {open && (
        <Modals
          isOpen={open}
          closeModal={() => {
            setOpen(false);
            // Call isClose function if it exists
          }}
          handleActionClick={redirectToNewPath}
          title="Do you really want to cancel? "
        />
      )}
      <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
        <h1 className="text-primary dark:text-main text-3xl font-bold font-sans mt-8 mb-7 justify-center items-center flex">
          {/* {sellData.consent_name} */}
        </h1>
        <div className="flex justify-between items-center">
          <p className="text-primary dark:text-main text-lg font-bold font-sans">
            Last Price (24H ) :  ${price}
          </p>
          <p className="text-primary dark:text-main text-lg font-bold font-sans">
            Maximum Units : {sellData.available_data_count}
          </p>
          <Button
            className="bg-primary dark:bg-black dark:text-white font-bold font-sans px-8 mx-4 bg-slate-600 text-black"
            title="Max"
            type="button"
            onClick={handleMaxButtonClick}
          />
        </div>
        <form
          className="flex flex-col gap-5 justify-center items-center"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col flex-wrap gap-x-14 gap-y-6 items-center justify-center">
            <Input
              label="Unit"
              placeholder="0.00"
              name="limitPrice"
              onClick={() => {
                handleClick();
              }}
              error={
                (touched.limitPrice &&
                  (errors.limitPrice ||
                    (values.limitPrice &&
                      values.limitPrice > (sellData.available_data_count || 0)
                      ? (validation = false)
                      : undefined))) ||
                (values.limitPrice && values.limitPrice > (sellData.available_data_count || 0)
                  ? 'Limit price should be less than or equal to the last price'
                  : undefined)
              }
              value={values.limitPrice}
              className="max-w-[450px] w-full"
              max={sellData.available_data_count}
              onChange={handleLimitPriceChange}
              type="number"
              min={0}
            />
            <Input
              label="Amount ($)"
              placeholder="0.00"
              name="amount"
              type="number"
              error={touched.amount && errors.amount}
              value={values.amount}
              className="max-w-[450px] w-full"
              onChange={(e) => {
                const newAmount = e.target.value;
                handleChange(e);
                setFieldValue('amount', newAmount); // Update values.amount
              }}
            />
            <Input
              label="Total"
              placeholder="0.00"
              readOnly
              name="total"
              error={touched.total && errors.total}
              value={total}
              className="max-w-[450px] w-full"
            />
          </div>

          <div className="flex gap-x-4 my-4 w-full justify-center items-center">
            <Button
              type="submit"
              className="bg-blue w-full disabled:bg-disabledBlue max-w-[250px]"
              title="Sell"
              disabled={!isValid}
              onClick={() => {
                setFieldValue('total', total);


              }}
            />
            <Button
              type="submit"
              className="bg-blue w-full disabled:bg-disabledBlue max-w-[250px]"
              title="Cancel"
              onClick={() => {
                // redirectToNewPath()
                setOpen(true);
              }}
            />
          </div>
        </form>

        {tableData.length > 0 && <Table data={tableData} />}
      </div>
    </>
  );
}

export default Main;