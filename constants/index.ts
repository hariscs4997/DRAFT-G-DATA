import { TPROPTION, Columns } from '@/types';
import { ResponseChoice } from '@/state/chats/types';
import moment from 'moment';

export const PROMPTRESPONSEOPTIONS: TPROPTION[] = [
  {
    title: 'Text',
    color: '#046C98',
    value: ResponseChoice.TEXT,
    darkColor: '#A1BF8C',
  },
  {
    title: 'Image',
    color: '#F5B11A',
    value: ResponseChoice.IMAGES,
    darkColor: '#F5B11A',
  },
  {
    title: 'Text + Image',
    color: '#E62431',
    value: ResponseChoice.BOTH,
    darkColor: '#907CB4',
  },
];

export const DESCRIPTIONANDUNITOFVARIABLES: {
  [key: string]: {
    definition: string;
    unit: string;
  };
} = {
  emotional_list: {
    definition: 'list of emotions experienced throughout the day',
    unit: 'Price per list of daily emotions',
  },
  high_temperature: {
    definition: 'highest temperature of the day',
    unit: 'Price per record of environment high temperature',
  },
  emotional_overall: {
    definition: 'an overall assessment of the days feelings',
    unit: 'Price per daily emotional index',
  },
  low_temperature: {
    definition: 'lowest temperature of the day',
    unit: 'Price per record of environment low temperature',
  },
  relative_finance_status: {
    definition: 'relative financial status ',
    unit: 'Price per daily financial status index',
  },
  weather: {
    definition: 'list of the weather of the day',
    unit: ' Price per daily weather record',
  },
  exercise_time: {
    definition: 'total amount of exercise during the day',
    unit: 'Price per record of exercise duration',
  },
  photos: {
    definition: 'any personal images that describe the day',
    unit: ' Price per personal digital image of at least 256x256 pixels',
  },
  exercise_total_time: {
    definition: 'total amount of exercise during the day',
    unit: 'Price per record of exercise duration',
  },
  health_overall: {
    definition: 'an assessment of the days health',
    unit: 'Price per daily comprehensive health report',
  },
  any_social_life: {
    definition: 'whether or not any social life occurred',
    unit: 'Price per record of daily social interaction',
  },
  social_life_list: {
    definition: 'list of social activities',
    unit: 'Price per itemized list of daily social activities',
  },
  weight: {
    definition: 'measure of weight in pounds',
    unit: 'Price per individual daily weight measurement',
  },
  family_status: {
    definition: 'status of close friends and family',
    unit: 'Price per record of family emotional status',
  },
  device_screen_time: {
    definition: 'amount of time spent on personal devices',
    unit: 'Price per record of screen time logged',
  },
  work_life_balance: {
    definition: 'overall focus of the day in a range between 0(work)-10(relaxation)',
    unit: 'Price per work-life balance assessment',
  },
  journaling: {
    definition: 'any points throughout the day worthy of note',
    unit: 'Text entry outlining days events, personal emotions, and or daily notes.',
  },
  date: {
    definition: 'the current day’s date',
    unit: 'Price per date-specific data entry',
  },
  screen_recording: {
    definition: 'video recording of on-screen device activity',
    unit: 'Screen Recording: Price per second of device screen recording',
  },
  camera_recording: {
    definition: 'video recording from device webcam where face and or body are clearly visible',
    unit: ' Price per second of device webcam recording where face or body are clearly visible',
  },
  screen_camera_recording: {
    definition:
      'simultaneous combination of video recording of on-screen device activity and video recording from device webcam where face and or body are clearly visible',
    unit: 'Price per second of device screen + webcam recording where face or body are clearly visible',
  },
  microphone_audio_recording: {
    definition: 'audio recording from device microphone with clearly audible feedback',
    unit: 'Price per second of device microphone recording',
  },
  system_audio_recording: {
    definition: 'audio recording from device system audio with clearly audible feedback',
    unit: 'Price per second of device system audio recording',
  },
  mic_system_recording: {
    definition:
      'simultaneous combination of audio recording from device microphone and audio recording from device system audio with clearly audible feedback',
    unit: ' Price per second of device microphone and system audio recording',
  },
};

export const maxWidth = '1450px';
export const INTERESTEDCOMPANYDATACOLUMNS: any = [
  {
    Header: 'Name',
    accessor: 'name' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Email',
    accessor: 'email' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Amount Offered',
    accessor: 'amount_offered' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Interest Reason',
    accessor: 'interest_reason' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Sell',
    accessor: 'sell' as keyof Columns, // accessor is the "key" in the data
  },
];

export function transformData(data: any) {
  const x = data ? data?.map((item: any) => item.x) : 0;
  const y = data ? data?.map((item: any) => item.y) : 0;
  return {
    x,
    y,
    mode: 'lines+markers',
    name: 'Scatter + Lines',
  };
}

export const TODAY = moment().format('YYYY-MM-DD 00:00:00');
export const YESTERDAY = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
