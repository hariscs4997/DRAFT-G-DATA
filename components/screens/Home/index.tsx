'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useChatBot } from '@/hooks/useChatBot';
import MainContent from './MainContent';
import SidePanel from './SidePanel';

export default function Main() {
  const { user, isAuthenticated } = useAuth();
  const {
    userPrompt,
    setUserPrompt,
    chats,
    fetchBotResponse,
    isLoading,
    recentChatHistory,
    openPreviousChats,
    startNewChat,
    provideResponseFeedback,
  } = useChatBot();

  return (
    <>
      <MainContent
        user={user}
        chats={chats}
        sendPrompt={fetchBotResponse}
        isLoading={isLoading}
        userPrompt={userPrompt}
        setUserPrompt={setUserPrompt}
        isAuthenticated={isAuthenticated}
        giveFeedback={provideResponseFeedback}
      />
      <SidePanel
        isAuthenticated={isAuthenticated}
        recentChatHistory={recentChatHistory}
        openPreviousChats={openPreviousChats}
        newChat={startNewChat}
      />
    </>
  );
}
