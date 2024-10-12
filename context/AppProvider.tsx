'use client';

import React, { createContext, useEffect, useContext, useCallback, useState, useMemo } from 'react';
import { Column } from 'react-table';
import { AxiosError } from 'axios';
import { usePersonalData } from '@/state/myGData/hooks';
import { api } from '@/config';
import { useUser } from '@/state/user/hooks';
import { createScreenData, createTableColumns, createTableData } from '@/lib';
import { Columns, TableName } from '@/types';
import { useWeather } from '@/hooks/useWeather';
import { useChatBot } from '@/hooks/useChatBot';
import { useAuth } from '@/hooks/useAuth';
import { ACCOUNTTYPE } from '@/constants/auth';
// import { CONSENTAPIRESPONSEDATA } from '@/temp';

type AppContextType = {
  gTableColumns: Column<Columns>[];
  getAllConsentData: () => Promise<void>;
  updateMyGData: () => Promise<void>;
  getAllPersonalData: () => Promise<void>;
  getAllCompanyConsentData: () => Promise<void>;
};
interface IProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextType>({
  gTableColumns: [],
  getAllConsentData: async () => { },
  updateMyGData: async () => { },
  getAllPersonalData: async () => { },
  getAllCompanyConsentData: async () => { },
});

function AppProvider({ children }: IProps) {
  const { setPersonalData, setGData, setRData, setCData, setScreenData, setCompData } = usePersonalData();
  const { fetchChatHistory, fetchRecentChats } = useChatBot();
  const [gTableColumns, setGTableColumns] = useState<Column<Columns>[]>([]);
  const { user } = useUser();
  const { logoutUser } = useAuth();

  //* weather hook
  useWeather();
  //* functions
  const getAllPersonalData = useCallback(async () => {
    try {
      const { data } = await api.get('api/personal_data_consents_rewards');
      const PData = createTableData({ tableName: TableName.PData, data: data.data });
      setPersonalData(PData);
    } catch (e) {
      if (
        e instanceof AxiosError &&
        (e.response?.status === 401 || e.response?.data.msg === 'Token has expired') &&
        user
      ) {
        logoutUser();
      }
    }
  }, [setPersonalData, logoutUser, user]);

  const getAllConsentData = useCallback(async () => {
    try {
      const { data } = await api.get('api/user_consents_rewards');
      const rData = createTableData({ tableName: TableName.RData, data: data.data });
      setRData(rData);
      const consentTableData = createTableData({ tableName: TableName.CData, data: data.data });
      setCData(consentTableData);
    } catch (e) {
      console.log('e', e);
    }
  }, [setRData, setCData]);
  const getAllCompanyConsentData = useCallback(async () => {
    try {
      if (!user || !user.accountType || user.accountType === ACCOUNTTYPE.PERSONAL) return;
      const { data } = await api.get(`api/company_consents_rewards/${user.id}/`);
      const compData = createTableData({ tableName: TableName.CompData, data });
      setCompData(compData);
    } catch (e) {
      // console.log('e', e)
    }
  }, [setCompData, user]);

  const getLastFivePersonalData = useCallback(async () => {
    try {
      const { data } = await api.get('api/user_personal_data/last_five');
      const gData = createTableData({ tableName: TableName.GData, data });
      if (data.length === 0) return;
      const gDataTableColumns = createTableColumns(data);
      setGTableColumns(gDataTableColumns);
      setGData(gData);
    } catch (e) {
      // console.log('e', e);
    }
  }, [setGData]);

  const getAllScreenData = useCallback(async () => {
    try {
      const { data } = await api.get('api/file-data/');
      const screenData = createScreenData(data.data);
      setScreenData(screenData);
    } catch (e) {
      // console.log('e', e);
    }
  }, [setScreenData]);

  const initApp = useCallback(() => {
    getAllPersonalData();
    getLastFivePersonalData();
    fetchChatHistory();
    fetchRecentChats();
    getAllConsentData();
    getAllScreenData();
    getAllCompanyConsentData();
  }, [
    getAllPersonalData,
    getLastFivePersonalData,
    getAllConsentData,
    fetchChatHistory,
    getAllScreenData,
    fetchRecentChats,
    getAllCompanyConsentData,
  ]);

  // values
  const value = useMemo(
    () => ({
      gTableColumns,
      getAllConsentData,
      updateMyGData: getLastFivePersonalData,
      getAllPersonalData,
      getAllCompanyConsentData,
    }),
    [gTableColumns, getAllConsentData, getLastFivePersonalData, getAllPersonalData, getAllCompanyConsentData],
  );

  //* initialize the app.
  useEffect(() => {
    if (!user) return;
    initApp();
  }, [user, initApp]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
export default AppProvider;