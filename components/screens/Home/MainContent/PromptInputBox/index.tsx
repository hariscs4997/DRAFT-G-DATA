import React, { useRef } from 'react';
import Image from 'components/UI/StyledImage';
import { send } from '@/public/assets';
import { useAutosizeTextArea } from '@/hooks/useAutoSizeTextArea';
import PromptResponseTypes from '@/components/screens/Home/MainContent/PromptInputBox/PromptResponseTypes';
import { TPROPTION } from '@/types';
import { UserPrompt } from '@/state/chats/types';
import Loader from '@/components/UI/Loader/Loader';

type TProps = {
  userPrompt: UserPrompt;
  setUserPrompt: (payload: UserPrompt) => void;
  sendPrompt: () => void;
  isLoading: boolean;
};
function PromptInputBox({ userPrompt, setUserPrompt, sendPrompt, isLoading }: TProps) {
  const handleResponseTypeChange = (responseType: TPROPTION) => {
    setUserPrompt({
      data: userPrompt.data,
      choice: responseType.value,
    });
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setUserPrompt({
      data: value,
      choice: userPrompt.choice,
    });
  };
  const handleKeyPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key } = e;
    // if there is no prompt default behaviour should be return
    if (userPrompt.data.trim().length === 0) return;
    if (key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // to prevent default behaviour of creating a new line
      sendPrompt();
    }
  };
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, userPrompt?.data ?? '');
  return (
    <div className="w-full flex flex-col absolute bottom-0 left-0 px-10  pb-10 mobile:px-4 mobile:pb-2 ">
      <div className="flex items-center w-full pl-4 py-4 bg-chat border-main dark:bg-darkChat border rounded-xl relative textarea-container dark:border-white">
        <textarea
          className="resize-none w-full bg-transparent overflow-hidden focus:outline-none pr-12 max-h-[200px] overflow-y-auto h-[24px] dark:text-main"
          value={userPrompt?.data}
          ref={textAreaRef}
          onKeyDown={handleKeyPressed}
          name="prompt"
          onChange={handlePromptChange}
        />

        <button
          type="button"
          className={`absolute bottom-1 right-5 bg-transparent focus:shadow-none focus:outline-none ${
            (isLoading || userPrompt.data.length === 0) && 'cursor-not-allowed'
          }`}
          onClick={sendPrompt}
          disabled={isLoading || userPrompt.data.length === 0}
        >
          {isLoading ? <Loader /> : <Image src={send} alt="send-icon" className="w-[40px] h-[40px] dark:invert" />}
        </button>
      </div>
      <PromptResponseTypes
        selectedResponseType={userPrompt.choice}
        setSelectedResponseType={handleResponseTypeChange}
      />
    </div>
  );
}
export default PromptInputBox;
