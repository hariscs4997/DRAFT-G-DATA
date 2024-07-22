/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Chat } from '@/state/chats/types';

export const createChatsFeedbackState = (chats: Chat[]) => {
  const results: { [key: number]: null | undefined | string } = {};
  for (const chat of chats) {
    if (chat.isBotResponse) {
      results[Number(chat.messageID)] = chat.choice;
    }
  }
  return results;
};
