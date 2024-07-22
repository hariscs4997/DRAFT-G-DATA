import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, useAppDispatch } from 'state/store';
import { TGroupedChatHistory, Chat, ChatHistory, ChatsSliceType, ResponseChoice, UserPrompt, THistory } from './types';
import {
  deleteChatsActions,
  setChatHistoryAction,
  setChatsAction,
  setUserPromptAction,
  updateChatAction,
  setRecentChatHistoryAction,
  startNewChatAction,
  openPreviousChatsAction,
  setActiveChatIdAction,
} from '.';

export const useChats = () => {
  const { chats, userPrompt, chatHistory, recentChatHistory, activeChatID } = useSelector<RootState, ChatsSliceType>(
    (state) => state.chats,
  );
  const dispatch = useAppDispatch();

  const setChats = useCallback(
    (payload: Chat) => {
      dispatch(setChatsAction(payload));
    },
    [dispatch],
  );
  const deleteChats = useCallback(() => {
    dispatch(deleteChatsActions());
  }, [dispatch]);
  const updateChat = useCallback(
    (payload: Chat, newMessageID: string) => {
      dispatch(
        updateChatAction({
          chat: payload,
          newMessageID,
        }),
      );
    },
    [dispatch],
  );
  const setUserPrompt = useCallback(
    (payload: UserPrompt) => {
      dispatch(setUserPromptAction(payload));
    },
    [dispatch],
  );
  const resetUserPrompt = useCallback(() => {
    dispatch(
      setUserPromptAction({
        data: '',
        choice: ResponseChoice.TEXT,
      }),
    );
  }, [dispatch]);
  const setChatHistory = useCallback(
    (payload: ChatHistory[]) => {
      dispatch(setChatHistoryAction(payload));
    },
    [dispatch],
  );
  const setRecentChatHistory = useCallback(
    (payload: TGroupedChatHistory) => {
      dispatch(setRecentChatHistoryAction(payload));
    },
    [dispatch],
  );
  const startNewChat = useCallback(() => {
    dispatch(startNewChatAction());
  }, [dispatch]);

  const setActiveChatID = useCallback(
    (payload: number) => {
      dispatch(setActiveChatIdAction(payload));
    },
    [dispatch],
  );
  const openPreviousChats = useCallback(
    (payload: THistory) => {
      setActiveChatID(payload.id);
      if (payload.messages.length > 0) dispatch(openPreviousChatsAction(payload.messages));
    },
    [dispatch, setActiveChatID],
  );

  return {
    chats,
    userPrompt,
    chatHistory,
    recentChatHistory,
    activeChatID,
    resetUserPrompt,
    updateChat,
    setUserPrompt,
    setChatHistory,
    setChats,
    deleteChats,
    startNewChat,
    setRecentChatHistory,
    openPreviousChats,
    setActiveChatID,
  };
};
