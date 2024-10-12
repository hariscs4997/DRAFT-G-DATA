/* eslint-disable no-restricted-syntax */

'use client';

import { useCallback } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { api } from '@/config';
import { useLoading } from '@/state/loading/hooks';
import { usePersonalData } from '@/state/myGData/hooks';
import { PersonalDataSchemaType } from '@/schema';
import { createTableData, createPayload } from '@/lib';
import { TableName, UpdateCompanyConsentPayload } from '@/types';
import { UpdateConsentRewardType } from '@/state/myGData/types';
import { useApp } from '@/context/AppProvider';

export const useMyGData = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { personalData, setPersonalData, gData, rData, cData, screenData, compData, setCompData } = usePersonalData();
  const { getAllConsentData, gTableColumns, updateMyGData, getAllPersonalData } = useApp();
  const savePersonalData = useCallback(
    async (personal_data: PersonalDataSchemaType) => {
      try {
        setIsLoading(true);
        if (personal_data.photos) {
          const formData = new FormData();
          formData.append('field_name', 'photos');
          for (const photo of personal_data.photos) {
            formData.append('image_files', photo);
          }
          await api.post('api/personal_data_consents_rewards/file_upload', formData);
        }
        delete personal_data.photos;
        const payload = createPayload(personal_data);
        await api.post('api/personal_data_consents_rewards', payload);
        //const newData = createTableData({ tableName: TableName.PData, data: data.data });
        // setPersonalData(newData);
        await Promise.all([updateMyGData(), getAllConsentData(), getAllPersonalData()]);
      } catch (e) {
        // console.log('e :>> ', e);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setPersonalData, updateMyGData, getAllConsentData, getAllPersonalData],
  );
  
  const updateConsentRewards = useCallback(
    async (arg: { id: number; payload: UpdateConsentRewardType }) => {
      const { id, payload } = arg;
      try {
        setIsLoading(true);
        await api.patch(`api/user_consents_rewards/${id}/`, payload);
        await getAllConsentData();
        await updateMyGData();
        toast.success('Consent updated');
      } catch (e) {
        // console.log('e :>> ', e);
        toast.error('Some problem updating consent');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, getAllConsentData, updateMyGData],
  );
  const updateCompanyConsentRewards = useCallback(
    async (payload: UpdateCompanyConsentPayload) => {
      try {
        setIsLoading(true);
        const { data } = await api.post('api/company_consents_rewards', payload);
        const companyData = createTableData({ tableName: TableName.CompData, data: data.data });

        setCompData(companyData);
        toast.success('Consent updated');
      } catch (e) {
        console.log('e :>> ', e);
        toast.error('Some problem updating consent');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setCompData],
  );
  const savePersonalDataTemporarily = useCallback(
    (data: PersonalDataSchemaType) => {
      // const newData = createTableData({ tableName: TableName.PData, data });
      const date = data.date ?? dayjs().format('YYYY-MM-DD');
      const photos: { file_url: string | ArrayBuffer }[] = [];

      for (const photo of data.photos) {
        const reader = new FileReader();
        reader.onload = (e) => {
          photos.push({
            file_url: e.target && e.target.result !== null ? e.target.result : '',
          });
        };
        reader.readAsDataURL(photo);
      }
      // wait for files to convert to data_uri
      setTimeout(() => {
        const updatedData = {
          ...personalData,
          [date]: {
            ...data,
            photos: [...photos],
          },
        };
        setPersonalData(updatedData);
      }, 3000);
    },
    [personalData, setPersonalData],
  );

  return {
    savePersonalData,
    isLoading,
    personalData,
    updateConsentRewards,
    savePersonalDataTemporarily,
    updateCompanyConsentRewards,
    gData,
    rData,
    cData,
    screenData,
    gTableColumns,
    compData,
  };
};
