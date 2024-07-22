import React, { memo } from 'react';
import Container from '@/components/UI/Containers';
import { add, no_chats } from '@/public/assets';
import Button from '@/components/UI/Button';
import { TGroupedChatHistory, THistory } from '@/state/chats/types';
import NoData from '@/components/UI/NoDataMessage';
import ChatHistory from './ChatHistory';

type TProps = {
  isAuthenticated: boolean;
  recentChatHistory: TGroupedChatHistory;
  openPreviousChats: (payload: THistory) => void;
  newChat: () => void;
};

function SidePanel({ isAuthenticated, recentChatHistory, openPreviousChats, newChat }: TProps) {
  return (
    <Container
      type="side"
      className={`pb-5 ${!isAuthenticated && 'hidden'} flex flex-col justify-between dark:bg-dark`}
    >
      <h3 className="font-sans text-xl text-primary font-bold px-2 pt-8 tablet:pt-10 dark:text-main">
        Recent Chat History
      </h3>
      {Object.keys(recentChatHistory).length > 0 ? (
        <ChatHistory groupedChatHistory={recentChatHistory} openPreviousChats={openPreviousChats} />
      ) : (
        <NoData icon={no_chats} message="No recent chats to display" isParentFixed />
      )}

      <Button
        title="New Chat"
        onClick={newChat}
        className="bg-blue w-full mt-9 disabled:bg-disabledBlue "
        isLoading={false}
        icon={add}
      />
    </Container>
  );
}

export default memo(SidePanel);
