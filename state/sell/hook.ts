import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, useAppDispatch } from 'state/store';
import {  setSellData } from './index';
import { getUserInfoFromCookies } from '@/lib/cookies';
import axios from 'axios';
interface IProps {
  title: string
  rData: any;
}

// export const useSellValue = () => {
//   const { sellData } = useSelector((state: RootState) => state.sell);
//   const dispatch = useAppDispatch();
//   const fetchSellData = async ({title, rData}: IProps) => {
//     const token = getUserInfoFromCookies();
//     try {
//       const name = rData[title];
//       if (name.id!==null){
//         const response = await axios.get(`https://api.g-datalabs.com/api/portfolio_stats/?consent_id=${name.id}`, {
//           headers: {
//             Authorization: `Bearer ${token?.key}`,
//           },
//         });
//       const sellData = response.data.data
//       console.log('sellData', sellData[0])
//       dispatch(setSellData(sellData[0]));
//     }} catch (error) {
//       console.error('Error fetching initial table data:', error);
//     }
//   };

  
//  return {
//    sellData,
//    setSellData,
//    fetchSellData
//   };
// };

export const useSellValue = () => {
  const sellData = useSelector((state: RootState) => state.sell); // Access the sell data from the Redux store
  const dispatch = useAppDispatch();

  const fetchSellData = async (title: string, rData: any) => {
    const token = getUserInfoFromCookies();
    try {
      const name = rData[title];
      if (name.id !== null) {
        const response = await axios.get(`https://api.g-datalabs.com/api/portfolio_stats/?consent_id=${name.id}`, {
          headers: {
            Authorization: `Bearer ${token?.key}`,
          },
        });
        const sellData = response.data.data[0]; 
        console.log('sellData', sellData)
        dispatch(setSellData(sellData)); // Dispatch the action to update the sell data in the Redux store
      }
    } catch (error) {
      console.error('Error fetching initial table data:', error);
    }
  };

  // Return the sell data and the fetch function
  return { sellData, fetchSellData };
};

