'use client';

import React from 'react';
import { maxWidth } from '@/constants';
import { HISTORYDATATABLECOLUMNS } from '@/constants/history';
import { useChats } from '@/state/chats/hooks';
import NoData from '@/components/UI/NoDataMessage';
import { no_chats } from '@/public/assets';
import Table from './Table';

function Main() {
  const { chatHistory } = useChats();
  return (
    <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
      <Table data={chatHistory} columns={HISTORYDATATABLECOLUMNS} />
      {chatHistory.length === 0 && <NoData message="No chat history to display" icon={no_chats} />}
    </div>
  );
}
export default Main;
