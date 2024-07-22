import React from 'react';
import Link from 'next/link';
import Container from '@/components/UI/Containers';
import PromptInputBox from '@/components/screens/Home/MainContent/PromptInputBox';
import ActiveChat from '@/components/screens/Home/MainContent/ActiveChat';
import { default_profile } from '@/public/assets';
import { Chat, UserPrompt } from '@/state/chats/types';
import { UserType } from '@/state/user/types';

type TProps = {
  userPrompt: UserPrompt;
  setUserPrompt: (payload: UserPrompt) => void;
  sendPrompt: () => void;
  isLoading: boolean;
  chats: Chat[];
  user: UserType | undefined;
  isAuthenticated: boolean;
  giveFeedback: (payload: { responseId: number; feedback: boolean }) => Promise<void>;
};

function MainContent({
  user,
  userPrompt,
  sendPrompt,
  setUserPrompt,
  isLoading,
  chats,
  isAuthenticated,
  giveFeedback,
}: TProps) {
  return (
    <Container type="main">
      <div className="absolute py-2 w-full left-4 font-sans z-10 bg-[#fbf8f1] dark:bg-main">
        <span className="text-[#333333aa] dark:text-[#c4c4c4] mr-2 mobile:text-sm">Powered By</span>
        <Link
          href="https://platform.openai.com/docs/models/gpt-3-5"
          className="dark:text-white text-primary font-medium mobile:text-sm"
          target="_blank"
        >
          <span className="font-bold mobile:text-sm">ChatGPT</span> 4o
        </Link>
      </div>
      {chats && (
        <ActiveChat
          chats={chats}
          userProfile={user ? user.image : default_profile}
          isLoggedIn={isAuthenticated}
          giveFeedback={giveFeedback}
        />
      )}
      <PromptInputBox
        userPrompt={userPrompt}
        setUserPrompt={setUserPrompt}
        sendPrompt={sendPrompt}
        isLoading={isLoading}
      />
    </Container>
  );
}
export default MainContent;
