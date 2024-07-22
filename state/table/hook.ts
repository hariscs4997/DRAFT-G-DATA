import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, useAppDispatch } from 'state/store';
import { getUserInfoFromCookies } from '@/lib/cookies';
import axios from 'axios';
import { addTableRow, deleteTableRow, setTableData } from './index';

export const useTableData = () => {
  const { tableData } = useSelector((state: RootState) => state.table);
  const dispatch = useAppDispatch();

  const addRowToTable = useCallback(
    (rowData: any) => {
      console.log('rowData', rowData);
      dispatch(addTableRow(rowData));
    },

    [dispatch],
  );

  const deleteRowFromTable = useCallback(
    async (id: number) => {
      const token = getUserInfoFromCookies();
      try {
        await fetch(`https://api.g-datalabs.com/api/user_consent_deals/${id}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token?.key}`,
          },
        });
        dispatch(deleteTableRow(id));
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    },
    [dispatch],
  );
  const fetchTableData = async () => {
    const token = getUserInfoFromCookies();
    try {
      const response = await axios.get('https://api.g-datalabs.com/api/user_consent_deals', {
        headers: {
          Authorization: `Bearer ${token?.key}`,
        },
      });
      const tableData = response.data; // Assuming the data is nested under "data" property
      dispatch(setTableData(tableData.data));
    } catch (error) {
      console.error('Error fetching initial table data:', error);
    }
  };

  return {
    tableData,
    addRowToTable,
    deleteRowFromTable,
    fetchTableData,
  };
};
