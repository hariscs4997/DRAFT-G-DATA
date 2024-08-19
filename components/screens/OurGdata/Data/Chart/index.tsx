'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import LineChart from './LineChart';
import CandleChart from './CandleChart';
import { DATATIMETYPE, DATATIMETYPESOPTIONS } from '@/constants/our_g_data';
import { maxWidth, PRICE_DECIMAL_PLACES, TODAY, YESTERDAY } from '@/constants';
import Select from '@/components/UI/Select';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';
import { Socket } from 'socket.io-client';
import { useUser } from '@/state/user/hooks';
import useSocket from '@/hooks/useSocket';
import { getIntervalFromSelectedValue } from '@/lib/charts';
import { convertToTitleCase, slugify } from '@/lib';
import { PATHS } from '@/constants/navigation';
import { TLineChartData } from '@/types';
import { useLoading } from '@/state/loading/hooks';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';


type TProps = {
  slug: string
}
type TCandleChartSocketPayload = { relative_interval: "h" | 'd' | 'm' | 'y', num_of_hours?: number, consent_name: string }

export default function Main({ slug }: TProps) {

  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedTimeRange, setSelectedTimeRange] = useState(DATATIMETYPE.YEAR);
  const [chartType, setChartType] = useState('line');
  const [lineChartData, setLineChartData] = useState<TLineChartData>({
    x: [],
    y: [],
  });
  const [candleChartData, setCandleChartData] = useState<any>();
  const [consentLivePrice, setConsentLivePrice] = useState('')
  const { isLoading, setIsLoading } = useLoading()


  const handleDataTypeChange = (selectedValue: DATATIMETYPE) => {
    setSelectedTimeRange(selectedValue);
    setLineChartData({
      x: [],
      y: [],
    });
  };
  const { interval, numOfHour, relativeInterval } = useMemo(() => getIntervalFromSelectedValue(selectedTimeRange), [selectedTimeRange])


  //d m y h
  const onConnect = useCallback((socket: Socket) => {
    const consentName = convertToTitleCase(slug).toUpperCase()
    let candleChartSocketPayload: TCandleChartSocketPayload = {
      relative_interval: relativeInterval,
      consent_name: consentName
    }
    if (relativeInterval === 'h') {
      candleChartSocketPayload = {
        ...candleChartSocketPayload,
        num_of_hours: numOfHour
      }
    }
    socket.emit('consent_line_chart_data', {
      interval,
      consent_name: consentName
    });


    socket.emit('consent_candle_chart_data', candleChartSocketPayload);

    socket.emit('consent_averages', {
      // interval: [TODAY, YESTERDAY],
    });
  }, [selectedTimeRange,interval,numOfHour]);

  const eventHandlers = useMemo(() => ({
    consent_candle_chart_data: (data: any) => {
      if (!data || !data.data) return;
      const candleChartData = {
        x: data.data.map((item: any) => (moment(item.start_time).format('YYYY-MM-DD'))),
        open: data.data.map((item: any) => (item.open)),
        high: data.data.map((item: any) => (item.max_amount)),
        low: data.data.map((item: any) => (item.min_amount)),
        close: data.data.map((item: any) => (item.close)),
      }
      setCandleChartData(candleChartData);
      if (isLoading) setIsLoading(false)

    },
    consent_line_chart_data: (data: any) => {
      const consentKey = convertToTitleCase(slug).toUpperCase()
      if (!data || !data.data || !data.data[consentKey]) return
      const consentLineChartData: TLineChartData = {
        x: data.data[consentKey].map((item: any) => (item.interval_start)),
        y: data.data[consentKey].map((item: any) => (item.average_price.toFixed(PRICE_DECIMAL_PLACES)))
      }
      setLineChartData((prev) => ({ ...prev, ...consentLineChartData }));
      if (isLoading) setIsLoading(false)
    },
    consent_averages: (data: any) => {
      if (data && data.data) {
        const selectedConsent = data.data.find((consent: any) => slugify(consent.field_name) === slug)
        if (!selectedConsent) return
        setConsentLivePrice(selectedConsent.average_price.toFixed(PRICE_DECIMAL_PLACES))
      }
    },
  }), [slug, isLoading]);


  useSocket('market_place', eventHandlers, onConnect);
  useEffect(() => { setIsLoading(true) }, [selectedTimeRange, chartType])

  return (
    <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
      <p className="font-bold text-[28px] dark:text-white justify-center items-center flex mb-4">
        {convertToTitleCase(slug ?? '')}
      </p>
      <div className="flex sm:flex-row flex-col gap-y-3 justify-between sm:items-center mx-4">
        <p className="font-bold text-[24px] dark:text-white">
          Price : {consentLivePrice}$
        </p>
        <div className="flex sm:mx-4 gap-x-6">
          <Select
            value={selectedTimeRange}
            options={DATATIMETYPESOPTIONS}
            className="w-full max-w-[250px] min-w-[180px]"
            onClick={(item) => handleDataTypeChange(item as DATATIMETYPE)}
          />
          <Select
            value={chartType}
            options={[
              { label: 'Line Chart', value: 'line' },
              { label: 'Candle Chart', value: 'candle' },
            ]}
            className="w-full max-w-[250px]"
            onClick={(item) => setChartType(item)}
          />
        </div>
      </div>

      <div className="flex justify-center items-center my-6 relative w-full">
        {isLoading ? <Skeleton width={680} height={430} /> :
          chartType === 'line' ? (
            <LineChart data={lineChartData} />
          ) : (
              <CandleChart data={candleChartData} />
          )}
        </div>

      <div className="flex justify-center items-center gap-x-4">
        <Button
          className={`w-full disabled:bg-black max-w-[250px] 
          ${user?.accountType?.toLowerCase() === 'company' ? 'bg-blue block' : 'hidden'}`}
          title="BUY"
          onClick={() => router.push(`${PATHS.BUY}`)}
        />
        <Button
          className="bg-[#F5B11A] w-full max-w-[250px]"
          title="SELL"
          onClick={() => router.push(`${pathname}/sell`)}
        />
      </div>
    </div>
  );
}