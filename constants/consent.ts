import { Column } from 'react-table';
import { Columns } from '@/types';
import { DESCRIPTIONANDUNITOFVARIABLES } from '.';

export const CONSENTTABLECOLUMNS: Column<Columns>[] = [
  {
    Header: 'Personal Data and Webcam',
    accessor: 'PDataAndWeb' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Definition',
    accessor: 'Definition' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'List Of Unit',
    accessor: 'Unit' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Companies',
    accessor: 'Companies' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Use',
    accessor: 'Use' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Price Offering',
    accessor: 'Pricing' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Threshold',
    accessor: 'Threshold' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Consent',
    accessor: 'Consent' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'id',
    accessor: 'id' as keyof Columns, // accessor is the "key" in the data
  },
];
export const DATATABLECOLUMNS: Column<Columns>[] = [
  {
    Header: 'Name',
    accessor: 'name' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Price',
    accessor: 'price' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Action',
    accessor: 'action' as keyof Columns, // accessor is the "key" in the data
  },
];
export const SELLDATACOLUMNS: any = [
  {
    Header: 'Name',
    accessor: 'name' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Price',
    accessor: 'amount' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Unit',
    accessor: 'quantity' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Total',
    accessor: 'total' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Action',
    accessor: 'action' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Status',
    accessor: 'status' as keyof Columns, // accessor is the "key" in the data
  },
];
export const BUYDATACOLUMNS: any = [
  {
    Header: 'Name',
    accessor: 'name' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Price',
    accessor: 'price' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Unit',
    accessor: 'quantity' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Total',
    accessor: 'total' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Buy',
    accessor: 'buy' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Status',
    accessor: 'status' as keyof Columns, // accessor is the "key" in the data
  },
];
export const ASSETSDATACOLUMNS: Column<Columns>[] = [
  {
    Header: 'Name',
    accessor: 'name' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Price',
    accessor: 'price' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Unit',
    accessor: 'quantity' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Total',
    accessor: 'total' as keyof Columns, // accessor is the "key" in the data
  },
];
export const CONSENTTABLEDATA = {
  'Emotional Overall': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.emotional_overall.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.emotional_overall.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  Weather: {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.weather.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.weather.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Relative Finance Status': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.relative_finance_status.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.relative_finance_status.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Exercise Time': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.exercise_time.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.exercise_time.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Any Social Life': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.any_social_life.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.any_social_life.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Social Life List': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.social_life_list.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.social_life_list.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Health Overall': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.health_overall.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.health_overall.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  Weight: {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.weight.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.weight.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Family Status': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.family_status.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.family_status.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Device Screen Time': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.device_screen_time.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.device_screen_time.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Work Life Balance': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.work_life_balance.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.work_life_balance.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  Journaling: {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.journaling.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.journaling.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  Date: {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.date.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.date.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Emotional List': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.emotional_list.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.emotional_list.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'High Temperature': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.high_temperature.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.high_temperature.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  Photos: {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.photos.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.photos.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Low Temperature': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.low_temperature.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.low_temperature.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Screen Recording': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.screen_recording.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.screen_recording.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Camera Recording': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.camera_recording.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.camera_recording.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Screen Camera Recording': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.screen_camera_recording.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.screen_camera_recording.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Microphone Audio Recording': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.microphone_audio_recording.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.microphone_audio_recording.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'System Audio Recording': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.system_audio_recording.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.system_audio_recording.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
  'Mic System Recording': {
    Consent: 'FALSE',
    Definition: DESCRIPTIONANDUNITOFVARIABLES.mic_system_recording.definition,
    Unit: DESCRIPTIONANDUNITOFVARIABLES.mic_system_recording.unit,
    Companies: [],
    Use: '',
    Threshold: '',
    Pricing: '',
    id: null,
  },
};
