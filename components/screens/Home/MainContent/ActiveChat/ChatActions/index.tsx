import React, { useEffect, useState } from 'react';
import IconButton from '@/components/UI/IconButton';
import Tooltip from './Tooltip';

type TProps = {
  show: boolean;
  messageId: number;
  choice: string | null | undefined;
  provideFeedback: (payload: { responseId: number; feedback: boolean }) => Promise<void>;
  messageContent: string;
};

function ChatActions({ show, choice, messageId, provideFeedback, messageContent }: TProps) {
  const [messageCopied, setMessageCopied] = useState(false);
  useEffect(() => {
    if (!messageCopied) return;
    const timer = setTimeout(() => {
      setMessageCopied(false);
    }, 2000);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [messageCopied]);
  return (
    <div
      className={`flex gap-x-4 items-center transition duration-400 absolute top-[26px] right-5 mobile:left-[85px] mobile:bottom-2 mobile:top-[unset] ${
        show ? 'translate-y-0 opacity-1' : '-translate-y-20 opacity-0'
      }`}
    >
      <IconButton
        src={
          choice === null || choice === undefined || choice === 'false'
            ? '/icons/like_outlined__icon.png'
            : '/icons/like_filled__icon.png'
        }
        className="relative h-[20px] w-[20px] mobile:w-[15px] mobile:h-[15px] dark:invert-[1]"
        disabled={choice === 'true'}
        onClick={() => {
          if (choice === 'true') return;
          provideFeedback({ responseId: messageId, feedback: true });
        }}
      />
      <IconButton
        src={
          choice === null || choice === undefined || choice === 'true'
            ? '/icons/like_outlined__icon.png'
            : '/icons/like_filled__icon.png'
        }
        className="relative h-[20px] w-[20px] mobile:w-[15px] mobile:h-[15px] dark:filter-invert(1) dark:invert-[1] rotate-180"
        disabled={choice === 'false'}
        onClick={() => {
          if (choice === 'false') return;
          provideFeedback({ responseId: messageId, feedback: false });
        }}
      />
      <IconButton
        src={messageCopied ? '/icons/check__icon.svg' : '/icons/copy__icon.png'}
        className="relative h-[20px] w-[20px] mobile:w-[15px] mobile:h-[15px] dark:invert-[1]"
        disabled={messageCopied}
        onClick={() => {
          navigator.clipboard.writeText(messageContent);
          setMessageCopied(true);
        }}
      >
        <Tooltip message="Copied" show={messageCopied} />
      </IconButton>
    </div>
  );
}

export default ChatActions;
