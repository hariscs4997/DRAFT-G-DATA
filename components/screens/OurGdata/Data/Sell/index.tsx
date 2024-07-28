'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic'
import { maxWidth, TODAY, YESTERDAY } from '@/constants';
import { SELLINITIALVALUES } from '@/constants/auth';
import { SellFormSchema } from '@/schema';
import { usePersonalData } from '@/state/myGData/hooks';
import { useFormik } from 'formik';
import { convertToTitleCase } from '@/lib/index';
import { Socket } from 'socket.io-client';
import { usePathname, useRouter } from 'next/navigation';
import { useConsentActions } from '@/hooks/useConsentActions';
import Modal from '@/components/UI/ModalDraft';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import useSocket from '@/hooks/useSocket';
import { TConsentSellInfo, TSelectedConsentForIntComp, TUserConsentDeals } from '@/types';
import { usePortfolioStats } from '@/hooks/usePortfolioStats';
import Skeleton from '@/components/UI/LazyLoader';


const ConsentSellOrders = dynamic(() => import('./ConsentSellOrders'))
const InterestedCompanies = dynamic(() => import('./InterestedCompanies'), {
  loading: () => <Skeleton />
})

function Main() {
  const pathname = usePathname();
  const router = useRouter();

  const { createSellConsentOffer, getUserConsentsDeals, isLoading, removeUserConsentDeal, getConsentDealsById, sellConsentToInterestedCompany } = useConsentActions()
  const { rData } = usePersonalData();
  const { getPortfolioStatsForConsent, isLoadingConsent } = usePortfolioStats()

  const [dataChanged, setDataChanged] = useState(true)
  const [tableData, setTableData] = useState<TUserConsentDeals[]>([]);
  const [consentSellInfo, setConsentSellInfo] = useState<TConsentSellInfo>()
  const [currentConsentPrice, setCurrentConsentPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInterestedCompanies, setShowInterestedCompanies] = useState(false)
  const [selectedConsentForInterestedCompanies, setSelectedConsentForInterestedCompanies] = useState<TSelectedConsentForIntComp | undefined>()
  const [interestedCompanies, setInterestedCompanies] = useState([])


  const consentTitle = useMemo(() => {
    const parts = pathname.split('/');
    return convertToTitleCase(parts[parts.length - 2]);
  }, [pathname]);


  const consent: any = useMemo(() => {
    return rData[consentTitle];
  }, [pathname, consentTitle, rData]);

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    setFieldValue,
    resetForm,
    isSubmitting
  } = useFormik({
    initialValues: SELLINITIALVALUES,
    validationSchema: SellFormSchema,
    onSubmit: async (results, onSubmit) => {
      const payload = {
        personal_data_field_id: consent.id,
        amount: Number(results.amount),
        qunatity: Number(results.limitPrice)
      };
      onSubmit.setSubmitting(true)
      await createSellConsentOffer(payload);
      onSubmit.setSubmitting(false)
      resetForm()
      //fetch table data again  
      setDataChanged(true)

    },
  });

  const handleMax = () => {
    if (!consentSellInfo) return
    setFieldValue('limitPrice', consentSellInfo.available_data_count);
    if (!values.amount) return;
    const totalValue = consentSellInfo.available_data_count * Number(values.amount)
    setFieldValue('total', totalValue);
  };

  const handleDeleteSellOrder = useCallback(async (orderId: number) => {
    await removeUserConsentDeal(orderId)
    setDataChanged(true)
  }, [])

  const resetInterestedCompaniesData = () => {
    setSelectedConsentForInterestedCompanies(undefined)
    setInterestedCompanies([])
  }

  const handleToggleShowInterestedCompanies = useCallback(() => {
    setShowInterestedCompanies(!showInterestedCompanies)
    if (!showInterestedCompanies) resetInterestedCompaniesData()
  }, [showInterestedCompanies])


  const showInterestedCompaniesOnConsentSelect = useCallback(async (consent: any) => {
    const consentDeals = await getConsentDealsById(consent.id);
    setSelectedConsentForInterestedCompanies({
      personalId: consent.personal_data_field_id,
      quantity: consent.quantity,
      id: consent.id
    })
    setInterestedCompanies(consentDeals.data)
    setShowInterestedCompanies(true)
  }, [])

  const handleSellSelectedConsent = useCallback(async (consent: any) => {
    if (!selectedConsentForInterestedCompanies) return
    const payload = {
      personal_data_field_id: selectedConsentForInterestedCompanies.personalId,
      seller_id: consent.user_consent_deal_id,
      amount: Number(consent.amount_offered),
      qunatity: selectedConsentForInterestedCompanies.quantity,
      status: consent.status.toUpperCase(),
    }

    await sellConsentToInterestedCompany(payload)
    setDataChanged(true)
    handleToggleShowInterestedCompanies()
  }, [selectedConsentForInterestedCompanies])

  const { isMaxLimitError, errorMessage } = useMemo(() => {
    if (!consentSellInfo || Number(values.limitPrice) <= Number(consentSellInfo.available_data_count))
      return {
        isMaxLimitError: false,
        errorMessage: ''
      }
    return {
      isMaxLimitError: true, errorMessage: `Value should be less than ${consentSellInfo.available_data_count}`
    }
  }, [consentSellInfo, values.limitPrice]);

  const onConnect = useCallback((socket: Socket) => {
    socket.emit('consent_averages', {
      interval: [TODAY, YESTERDAY],
    });
  }, []);

  const eventHandlers = useMemo(() => ({
    consent_averages: (data: any) => {
      const parts = pathname.split('/')
      const consentSlug = parts[parts.length - 2]
      if (data && data.data) {
        const valuePrice = data.data.find((item: any) => item.field_name === consentSlug);
        if (!valuePrice) return
        const averagePrice = valuePrice?.average_price || 0;
        setCurrentConsentPrice(averagePrice);
        setFieldValue('amount', averagePrice);
      }
    },
  }), [setFieldValue, setCurrentConsentPrice]);

  useSocket('market_place', eventHandlers, onConnect);

  //update total when unit and amount changes
  useEffect(() => {
    if (!values.amount || !values.limitPrice) return
    setFieldValue('total', Number(values.amount) * Number(values.limitPrice))
  }, [values.amount, values.limitPrice])

  useEffect(() => {
    if (!dataChanged) return;
    getUserConsentsDeals().then((data) => {
      setTableData(data);
      setDataChanged(false)
    })
  }, [dataChanged]);

  useEffect(() => {
    if (!consent.id) return
    getPortfolioStatsForConsent(consent.id).then(data => {
      setConsentSellInfo(data[0])
    })
  }, [consent])

  return (
    <>
      <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
        {isLoadingConsent ?
          <Skeleton />
          :
          <>
            <h1 className="text-primary dark:text-main text-3xl font-bold font-sans mt-8 mb-7 text-center">
              {consentSellInfo && convertToTitleCase(consentSellInfo.consent_name)}
            </h1>
            <div className="flex justify-between items-center">
              <p className="text-primary dark:text-main text-lg font-bold font-sans">
                Last Price &#40;24H&#41; :  ${currentConsentPrice}
              </p>
              <p className="text-primary dark:text-main text-lg font-bold font-sans">
                {consentSellInfo && consentSellInfo.available_data_count}
              </p>
              <Button
                className="bg-blue font-bold font-sans px-8 text-white py-2"
                title="Max"
                type="button"
                onClick={handleMax}
              />
            </div>
            <form
              className="flex flex-col gap-5 justify-center items-center max-w-[450px] w-full mx-auto"
              noValidate
              onSubmit={handleSubmit}
            >
            <Input
              label="Unit"
              placeholder="0.00"
              name="limitPrice"
                error={(touched.limitPrice && errors.limitPrice) || (isMaxLimitError && errorMessage)}
                value={values.limitPrice}
                className="w-full"
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    handleChange(e)
                  }
                }}
            />
            <Input
              label="Amount ($)"
              placeholder="0.00"
                name="amount"
              error={touched.amount && errors.amount}
              value={values.amount}
                className="w-full"
              onChange={(e) => {
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                  handleChange(e)
                }
              }}
            />
            <Input
              label="Total"
              placeholder="0.00"
              readOnly
              name="total"
              error={touched.total && errors.total}
                value={values.total}
                className="w-full"
              />
              <div className="flex gap-x-4 my-4 w-full justify-center items-center">
                <Button
                  type="submit"
                  className="bg-blue w-full disabled:bg-disabledBlue"
                  title="Sell"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  className="bg-[#F5B11A] w-full"
                  title="Cancel"
                  onClick={() => setIsModalOpen(true)
                  }
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </>
        }
        <ConsentSellOrders
          data={tableData}
          isLoadingData={isLoading}
          handleDeleteSellOrder={handleDeleteSellOrder}
          handleSelectConsent={showInterestedCompaniesOnConsentSelect} />
      </div>
      <InterestedCompanies
        isShow={showInterestedCompanies}
        onClose={handleToggleShowInterestedCompanies}
        interestedCompanies={interestedCompanies}
        sellConsentToCompany={handleSellSelectedConsent}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Do you really want to cancel?"
        className='py-3'
      >
        <div className="flex gap-x-4 my-4 w-full justify-center items-center">
          <Button
            onClick={() => { router.back() }}
            className="bg-blue w-full disabled:bg-disabledBlue max-w-[250px]"
            title="Yes"
          />
          <Button
            type="button"
            className="bg-[#F5B11A] w-full max-w-[250px]"
            title="No"
            onClick={closeModal}
          />
        </div>
      </Modal>

    </>
  );
}

export default Main;






// {
//   tableOpen && (<TablePopUp openModal={tableOpen}
//     isClose={() => {
//       setTableOpen(!tableOpen);
//       // Call isClose function if it exists
//     }}
//     // data2={sellData}
//     data2={[]}
//   />)
// }


