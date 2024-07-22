import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Typed from 'react-typed';
import { StaticImageData } from 'next/image';
import logo from '@/public/images/logo.png';
import logo_dark from '@/public/images/logo-dark.png';
import logo_dark_gif from '@/public/images/logo_dark.gif';
import logo_gif from '@/public/images/logo.gif';
import Image from '@/components/UI/StyledImage';
import { Chat as TChat } from '@/state/chats/types';
import { useTheme } from '@/context/ThemeProvider';
import { Theme } from '@/types';
import { createChatsFeedbackState } from '@/lib/chats';
import ChatActions from './ChatActions';
import Chat from './Chat';

type TProps = {
  chats: TChat[];
  userProfile: string | StaticImageData;
  isLoggedIn: boolean;
  giveFeedback: (payload: { responseId: number; feedback: boolean }) => Promise<void>;
};

function ActiveChat({ chats, userProfile, isLoggedIn, giveFeedback }: TProps) {
  const messagesRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [chatsFeedbacks, setChatsFeedback] = useState<{ [key: number]: null | undefined | string }>({});
  const profile = useCallback(
    (isLoading: boolean) => {
      if (isLoading && theme === Theme.LIGHT) return logo_gif;
      if (isLoading && theme === Theme.DARK) return logo_dark_gif;
      if (!isLoading && theme === Theme.DARK) return logo_dark;

      return logo;
    },
    [theme],
  );

  const provideFeedback = useCallback(
    async (payload: { responseId: number; feedback: boolean }) => {
      const { responseId, feedback } = payload;
      setChatsFeedback((prev) => ({
        ...prev,
        [responseId]: feedback.toString(),
      }));
      try {
        await giveFeedback(payload);
      } catch (e) {
        // reset if fails
        setChatsFeedback((prev) => ({
          ...prev,
          [responseId]: String(!feedback),
        }));
      }
    },
    [setChatsFeedback, giveFeedback],
  );
  //* scroll to bottom whenever new message is added
  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollBy({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    });
    const chatsFeedback = createChatsFeedbackState(chats);
    setChatsFeedback(chatsFeedback);
  }, [chats]);

  return (
    <div className="px-10 pt-10 pb-12 overflow-y-auto h-[calc(100%_-_190px)] mobile:px-2 " ref={messagesRef}>
      {chats.map((msg) => (
        <Chat
          key={msg.messageID}
          isLoading={msg.isLoading}
          profile={msg.isBotResponse ? profile(msg.isLoading) : userProfile}
        >
          {msg.content.text !== null &&
            msg.content.text.length > 0 &&
            msg.messageID !== chats[chats.length - 1].messageID && (
              <div className="whitespace-pre-line">{msg.content.text}</div>
              // eslint-disable-next-line @typescript-eslint/indent
            )}
          {msg.content.text !== null &&
            msg.content.text.length > 0 &&
            msg.messageID === chats[chats.length - 1].messageID && (
              <Typed strings={[msg.content.text]} typeSpeed={30} showCursor={false} className="whitespace-pre-line" />
              // eslint-disable-next-line @typescript-eslint/indent
            )}

          {msg.content.images.length > 0 && (
            <div className="flex flex-row max-w-[60%] gap-2 flex-wrap mt-6  mobile:max-w-[70%] mobile:py-2 mobile:gap-0 dark:bg-darkChat">
              {msg.content.images.map((img) => (
                <Image
                  key={uuidv4()}
                  src={img}
                  alt="img"
                  className="w-[150px] h-[160px] laptop:w-[120px] laptop:h-[130px] mobile:w-[95px] mobile:h-[100px]"
                />
              ))}
            </div>
          )}
          {isLoggedIn && msg.isBotResponse && (
            <ChatActions
              show={!msg.isLoading}
              choice={chatsFeedbacks[Number(msg.messageID)]}
              messageId={Number(msg.messageID)}
              provideFeedback={provideFeedback}
              messageContent={msg.content.text}
            />
          )}
        </Chat>
      ))}
    </div>
  );
}
export default memo(ActiveChat);
