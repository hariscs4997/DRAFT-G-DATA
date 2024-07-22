'use client';

import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { api } from '@/config';
import { useLoading } from '@/state/loading/hooks';
import { useChats } from '@/state/chats/hooks';
import { createChat, createHistoryTableData, createRecentChatHistory, groupMessagesByDate } from '@/lib';
import { useUser } from '@/state/user/hooks';

export const useChatBot = () => {
  const { isLoading, setIsLoading } = useLoading();
  const {
    chats,
    userPrompt,
    setUserPrompt,
    setChats,
    resetUserPrompt,
    updateChat,
    recentChatHistory,
    startNewChat,
    openPreviousChats,
    activeChatID,
    setActiveChatID,
    setChatHistory,
    setRecentChatHistory,
  } = useChats();
  const { user } = useUser();

  const fetchRecentChats = useCallback(async () => {
    try {
      const { data } = await api.get('api/chat/');
      const recentchatHistory = createRecentChatHistory(data.data);
      const groupedMessages = groupMessagesByDate(recentchatHistory);
      if (!groupedMessages) return;
      setRecentChatHistory(groupedMessages);
    } catch (e) {
      // console.log('e :>> ', e);
    }
  }, [setRecentChatHistory]);

  const fetchChatHistory = useCallback(async () => {
    try {
      const { data } = await api.get('api/history/');
      const chatHistoryTableData = createHistoryTableData(data.data);
      setChatHistory(chatHistoryTableData);
    } catch (e) {
      // console.log('e :>> ', e);
    }
  }, [setChatHistory]);

  const fetchNewChatID = useCallback(
    async (chatName: string) => {
      try {
        const { data } = await api.post('api/chat/', {
          name: chatName,
        });
        if (data.data.id) setActiveChatID(data.data.id);
        return data.data.id;
      } catch (e) {
        // console.log('e :>> ', e);
        return e;
      }
    },
    [setActiveChatID],
  );

  const provideResponseFeedback = useCallback(
    async (payload: { responseId: number; feedback: boolean }) => {
      const { responseId, feedback } = payload;
      try {
        const { data } = await api.post(`choice/${responseId}`, { data: feedback });
        if (!data.response) return;
        if (data.response === 'success') toast.success('Feedback provided');
        fetchRecentChats();
        fetchChatHistory();
      } catch (e) {
        // console.log('e :>> ', e);
      }
    },
    [fetchRecentChats, fetchChatHistory],
  );
  const fetchBotResponse = useCallback(async () => {
    try {
      const userMessage = createChat({ isBotResponse: false, isLoading: false, text: userPrompt.data, images: [] });
      const botResponseLoading = createChat({ isBotResponse: true, isLoading: true, text: '', images: [] });
      setChats(userMessage);
      setChats(botResponseLoading);
      setIsLoading(true);
      resetUserPrompt();
      let chatID = activeChatID;
      if (user && !chatID) chatID = await fetchNewChatID(userPrompt.data);
      const payload = user ? { ...userPrompt, chat_id: chatID } : userPrompt;
      const { data } = await api.post('get-answer-images', payload);
      let images = [];
      let text = '';
      // @ts-ignore
      if (data.images) images = data.images.map((url) => url);
      if (data.response?.length) text = data.response;
      updateChat(
        {
          ...botResponseLoading,
          isLoading: false,
          content: {
            text,
            images,
          },
        },
        data.id,
      );
      if (user) {
        fetchRecentChats();
        fetchChatHistory();
      }
    } catch (e) {
      // console.log('e', e);
      if (e instanceof AxiosError) toast.error(e.response?.data.error);
      else toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    userPrompt,
    setChats,
    resetUserPrompt,
    updateChat,
    user,
    activeChatID,
    fetchNewChatID,
    fetchChatHistory,
    fetchRecentChats,
  ]);

  return {
    fetchBotResponse,
    isLoading,
    chats,
    userPrompt,
    setUserPrompt,
    recentChatHistory,
    startNewChat,
    openPreviousChats,
    fetchChatHistory,
    fetchRecentChats,
    provideResponseFeedback,
  };
};
