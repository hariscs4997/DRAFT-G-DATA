export enum ResponseChoice {
  BOTH = 'both',
  TEXT = 'answer',
  IMAGES = 'images',
}

export type Chat = {
  isBotResponse: boolean;
  messageID: string;
  isLoading: boolean;
  choice?: string | null;
  content: {
    text: string;
    images: string[];
  };
};
export type ChatHistory = {
  answer: string;
  chatID: number;
  choice: string | null;
  images: string[];
  question: string;
  date: string;
};
export type UserPrompt = {
  data: string;
  choice: ResponseChoice;
};
export type THistory = {
  id: number;
  title: string;
  date: string;
  messages: Chat[];
};
export type TGroupedChatHistory = {
  [key: string]: THistory[];
};

export type ChatsSliceType = {
  chats: Chat[];
  userPrompt: UserPrompt;
  recentChatHistory: TGroupedChatHistory;
  chatHistory: ChatHistory[];
  activeChatID: number | undefined;
};
