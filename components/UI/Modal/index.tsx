import React, { useState } from 'react';
import Input from '../Input';
import { useBuyData } from '@/hooks/useBuy';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleActionClick: () => void; // Corrected type for handleActionClick
  title: string;
  transition?: boolean;
  amount?: boolean
  amountValue?: {
    id: String,
    amount: Number
  }
}

function Modals({ isOpen, closeModal, title, handleActionClick, transition, amount, amountValue }: ModalProps) {
  const [amountOffered, setAmountOffered] = useState<any>(amountValue?.amount)
  const { fetchBuyData, fetchBuyDetails } = useBuyData();
  const handleBuyData = async (id: any, total: any) => {
    try {
      const buyDetail = await fetchBuyDetails({
        user_consent_deal_id: parseInt(id),
        amount_offered: total
      });
      console.log('Buy detail:', buyDetail);
      closeModal();
    } catch (error) {
      console.error('Error fetching buy details:', error);
    }
  };
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative py-10 px-4 bg-[#F0E5D8] dark:bg-[#B6B6B5] w-full max-w-md rounded-lg">
            {!transition ? (
              <button
                type="button"
                className="absolute top-0 right-0 mr-4 text-xl font-semibold text-gray-600 dark:text-white"
                onClick={closeModal}
              >
                &times;
              </button>
            ) : ("")}

            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-black mb-5">{title}</h1>

              <div className="flex-col justify-center items-center gap-y-4">
                <div>
                  {amount &&
                    <Input
                      value={amountOffered ? amountOffered : ''}
                      title='Amount Offered'
                      onChange={(e: any) => { setAmountOffered(e.target.value) }}
                      label='Amount'
                      type='number'
                      min={0}
                    />
                  }
                </div>
                {transition ? (
                  <>
                    <button
                      type="button"
                      className="bg-[#046C98] text-white font-bold py-2 px-6 rounded mr-5 min-w-[120px] hover:px-8 transition-all"
                      onClick={() => {
                        handleActionClick();
                        closeModal();

                      }}
                    >
                      Sell
                    </button>
                    <button
                      type="button"
                      className="bg-[#F5B11A] text-white font-bold py-2 px-6  rounded hover:px-8  min-w-[120px] justify-center items-center"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className='min-w-[300px] mt-4 flex mx-auto'>
                    <button
                      type="button"
                      className="bg-[#046C98] min-w-[120px] text-white font-bold py-2 px-6 rounded mr-5 hover:px-8 transition-all  justify-center items-center"
                      onClick={() => {
                        amount ? handleBuyData(amountValue?.id, amountOffered) : handleActionClick();
                        closeModal();

                      }}
                    >
                      Yes
                    </button>

                    <button
                      type="button"
                      className="bg-[#F5B11A] text-white font-bold py-2 px-6  rounded hover:px-8  min-w-[120px] justify-center items-center"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>

                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modals;
