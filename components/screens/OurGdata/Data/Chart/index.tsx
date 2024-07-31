'use client';

import React, { useState, useCallback, useMemo } from 'react';
import LineChart from '@/components/UI/LineChart';
import CandleChart from '@/components/UI/CandleChart';
import { DATATIMETYPESOPTIONS } from '@/constants/our_g_data';
import { maxWidth, TODAY, transformData, YESTERDAY } from '@/constants';
import Select from '@/components/UI/Select';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';
import { Socket } from 'socket.io-client';
import { useUser } from '@/state/user/hooks';
import useSocket from '@/hooks/useSocket';
import { getIntervalFromSelectedValue } from '@/lib/charts';
import { convertToTitleCase, slugify } from '@/lib';
import { PATHS } from '@/constants/navigation';
import { useTheme } from '@/context/ThemeProvider';
import { TLineChartData } from '@/types';


type TProps = {
  slug: string
}

export default function Main({ slug }: TProps) {

  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const [selectedTimeRange, setSelectedTimeRange] = useState('1 DAY');
  const [chartType, setChartType] = useState('line');
  const [lineChartData, setLineChartData] = useState<any>();
  const [candleChartData, setCandleChartData] = useState<any>();
  const [consentLivePrice, setConsentLivePrice] = useState('') 


  const handleDataTypeChange = (selectedValue: string) => {
    setSelectedTimeRange(selectedValue);
    setLineChartData([]);
  };


  const CHARTLAYOUT = useMemo(() => {
    const plotColor = theme === 'dark' ? '#454545' : '#D9D9D9';
    const axisColor = theme === 'light' ? '#454545' : '#D9D9D9';
    return {
      xaxis: {
        title: 'Time Frame',
        type: 'category',
        tickmode: 'linear',
        color: axisColor,
      },
      yaxis: { title: 'Y-axis', color: axisColor },
      plot_bgcolor: plotColor,
      paper_bgcolor: plotColor,
      responsive: true,
    };
  }, [theme]);

  const onConnect = useCallback((socket: Socket) => {
    const { interval, numOfHour } = getIntervalFromSelectedValue(selectedTimeRange);
    socket.emit('consent_line_chart_data', { interval });
    socket.emit('consent_candle_chart_data', { relative_interval: 'h', num_of_hours: numOfHour });
    socket.emit('consent_averages', {
      interval: [TODAY, YESTERDAY],
    });
  }, [selectedTimeRange]);


  const eventHandlers = useMemo(() => ({
    consent_candle_chart_data: (data: any) => {
      console.log('Recieved data from consent_candle_chart_data --> ', data);

      if (data && data.data) {
        const transformedData = data.data.map((item: { interval_start: string | number | Date; open: any; max_amount: any; min_amount: any; close: any; }) => ({
          x: new Date(item.interval_start).toISOString().slice(11, 16),
          open: item.open,
          high: item.max_amount,
          low: item.min_amount,
          close: item.close,
        }));
        setCandleChartData(transformedData);
      }
    },
    consent_line_chart_data: (data: any) => {
      console.log('Received data from consent_line_chart_data -->', data.data);
      if (data && data.data && data.data[slug!]) {
        const formattedData: TLineChartData[] = data.data[slug!].map((item: any) => ({
          x: item.created_at,
          y: item.amount,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        }));

        setLineChartData(transformData(formattedData));
      }
    },
    consent_averages: (data: any) => {
      if (data && data.data) {
        const selectedConsent = data.data.find((consent: any) => slugify(consent.field_name) === slug)
        if (!selectedConsent) return
        setConsentLivePrice(selectedConsent.average_price)
      }
    },
  }), [slug]);

  useSocket('market_place', eventHandlers, onConnect);



  return (
    <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
      <p className="font-bold text-[28px] dark:text-white justify-center items-center flex mb-4">
        {convertToTitleCase(slug ?? '')}
      </p>
      <div className="justify-between flex items-center mx-4">
        <p className="font-bold text-[24px] dark:text-white">
          Price : {consentLivePrice}$
        </p>
        <div className="flex mx-4 gap-x-6">
          <Select
            value={selectedTimeRange}
            options={DATATIMETYPESOPTIONS}
            className="w-full max-w-[200px]"
            onClick={(item: string) => handleDataTypeChange(item)}
          />
          <Select
            value={chartType}
            options={[
              { label: 'Line Chart', value: 'line' },
              { label: 'Candle Chart', value: 'candle' },
            ]}
            className="w-full max-w-[200px]"
            onClick={(item: string) => setChartType(item)}
          />
        </div>
      </div>
      <div className="flex justify-center items-center my-4 w-full rounded-md relative">
        <div className="flex justify-center items-center my-4 relative bg-zinc-300 w-fit min-h-[400px]">
          {chartType === 'line' ? (
            <LineChart data={lineChartData} layout={CHARTLAYOUT} />
          ) : (
              <CandleChart data={candleChartData} layout={CHARTLAYOUT} />
          )}
        </div>

      </div>
      <div className="flex justify-center items-center gap-x-4">
        <Button
          type="submit"
          className={`w-full disabled:bg-black max-w-[250px] 
          ${user?.accountType?.toLowerCase() === 'company' ? 'bg-blue block' : 'hidden'}`}
          title="BUY"
          onClick={() => router.push(`${PATHS.CHART}/buy`)}
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