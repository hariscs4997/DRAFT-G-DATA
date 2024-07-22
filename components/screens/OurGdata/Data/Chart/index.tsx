'use client';

import React, { useState, useCallback, useMemo } from 'react';
import LineChart from '@/components/UI/LineChart';
import CandleChart from '@/components/UI/CandleChart';
import { DATATIMETYPESOPTIONS } from '@/constants/ourgdata';
import { maxWidth, transformData } from '@/constants';
import Select from '@/components/UI/Select';
import { usePathname, useRouter } from 'next/navigation';
import { DATATABLEDATA } from '@/temp';
import Button from '@/components/UI/Button';
import { Socket } from 'socket.io-client';
import { useUser } from '@/state/user/hooks';
import useSocket from '@/hooks/useSocket';
import { getIntervalFromSelectedValue } from '@/lib/charts';

type DataType = {
  created_at: string[] | undefined;
  amount: number[] | undefined;
  type: string;
  marker: { color: string };
};


export default function Main() {

  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const TITLE = pathname.split('/').pop();
  const GRAPHDATA = DATATABLEDATA.find((item) => item.name === TITLE);

  const [selectedTimeRange, setSelectedTimeRange] = useState('1 DAY');
  const [chartType, setChartType] = useState('line');
  const [chartData, setChartData] = useState<DataType[]>([]);
  const [candleChartData, setCandleChartData] = useState<any>();


  const onConnect = useCallback((socket: Socket) => {
    const { interval, numOfHour } = getIntervalFromSelectedValue(selectedTimeRange);
    socket.emit('consent_line_chart_data', { interval });
    socket.emit('consent_candle_chart_data', { relative_interval: 'h', num_of_hours: numOfHour });
  }, []);


  const eventHandlers = useMemo(() => ({
    consent_candle_chart_data: (data: any) => {
      const transformedData = data.data.map((item: { interval_start: string | number | Date; open: any; max_amount: any; min_amount: any; close: any; }) => ({
        x: new Date(item.interval_start).toISOString().slice(11, 16), // Extract time in HH:MM format
        open: item.open,
        high: item.max_amount,
        low: item.min_amount,
        close: item.close,
      }));
      setCandleChartData(transformedData);
    },
    consent_line_chart_data: (data: any) => {
      console.log('Received data from socket:', data.data);
      const saveData = data.data;
      if (!saveData) {
        console.log('first');
      }
      const formattedData = TITLE && saveData[TITLE]?.map((item: any) => ({
        x: item.created_at,
        y: item.amount,
        type: chartType === 'line' ? 'scatter' : 'candlestick',
        mode: chartType === 'line' ? 'lines+markers' : undefined,
        marker: { color: 'red' },
      }));
      setChartData(formattedData);
    },
  }), [chartType, TITLE]);

  useSocket('market_place', eventHandlers, onConnect);

  const handleDataTypeChange = (selectedValue: string) => {
    setSelectedTimeRange(selectedValue);
    setChartData([]);
  };



  const chartLayout = {
    xaxis: {
      title: 'Time Frame',
      type: 'category',
      tickmode: 'linear',
      color: '454545',
    },
    yaxis: { title: 'Y-axis', color: '454545' },
    plot_bgcolor: '454545',
    paper_bgcolor: '454545',
    responsive: true,
  };

  return (
    <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
      <p className="font-bold text-[28px] dark:text-white justify-center items-center flex mb-4">
        {TITLE}
      </p>
      <div className="justify-between flex items-center mx-4">
        <p className="font-bold text-[24px] dark:text-white">
          Price : {GRAPHDATA?.prices} $
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

      <div className="justify-center flex items-center my-4  w-[98%] rounded-md mx-2 relative">
        <div className="flex items-baseline bg-zinc-300 animate-pulse w-[600px] mt-6 h-[400px]">
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>

        <div className="absolute inset-0  flex items-center my-4 justify-center ">
          {chartType === 'line' ? (
            <LineChart data={transformData(chartData)} layout={chartLayout} />
          ) : (
            <CandleChart data={candleChartData} layout={chartLayout} />
          )}
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-4 my-7 mt-[100px]">
        <Button
          type="submit"
          className={`w-full disabled:bg-black max-w-[250px] 
          ${user?.accountType === 'Company' ? 'bg-blue' : 'hidden'}`}
          title="BUY"
          onClick={() => {
            router.push('/our_g-data/data/charts/buy');
          }}
        />
        <Button
          className="bg-[#F5B11A] w-full max-w-[250px]"
          title="SELL"
          onClick={() => {
            router.push(`${pathname}/sell`);
          }}
        />
      </div>
    </div>
  );
}




