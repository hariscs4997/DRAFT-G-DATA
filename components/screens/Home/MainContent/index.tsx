'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Container from '@/components/UI/Containers';
import PromptInputBox from '@/components/screens/Home/MainContent/PromptInputBox';
import { default_profile } from '@/public/assets';
import { useAuth } from '@/hooks/useAuth';
import { useChatBot } from '@/hooks/useChatBot';

const ActiveChat = dynamic(() => import('@/components/screens/Home/MainContent/ActiveChat'));


type TProps = {

};

function MainContent({
}: TProps) {
  const { user, isAuthenticated } = useAuth();
  const {
    userPrompt,
    setUserPrompt,
    chats,
    fetchBotResponse: sendPrompt,
    isLoading,
    provideResponseFeedback: giveFeedback,
  } = useChatBot();

  return (
    <Container type="main">
      <div className="absolute py-2 w-full left-4 font-sans z-10 bg-[#fbf8f1] dark:bg-main">
        <span className="text-[#333333aa] dark:text-[#c4c4c4] mr-2 mobile:text-sm">Powered By</span>
        <Link
          href="https://platform.openai.com/docs/models/gpt-3-5"
          className="dark:text-white text-primary font-medium mobile:text-sm"
          target="_blank"
        >
          <span className="font-bold mobile:text-sm">ChatGPT</span> 4o-mini
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
