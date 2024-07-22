import React, { useState } from 'react';
import { ScreenDataType } from '@/state/myGData/types';

type TProps = {
  data: ScreenDataType;
};

function Accordion({ data }: TProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <button
      type="button"
      className="bg-chat dark:bg-darkChat w-full border-none my-3 rounded-md "
      key={data.id}
      onClick={handleOpen}
    >
      <div className="flex flex-row justify-between items-center py-6 px-3">
        <h1 className="text-primary text-2xl font-sans font-semibold dark:text-main">{data.date}</h1>
        <div className="relative h-[40px] w-[40px]">
          <span className="absolute w-[30px] h-[5px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-main dark:bg-darkMain rounded-md" />
          <span
            className={`absolute w-[30px] h-[5px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 ${
              isOpen ? 'rotate-0' : 'rotate-90'
            } bg-main dark:bg-darkMain rounded-md`}
          />
        </div>
      </div>
      <div className={`px-3 transition-all duration-300 ${isOpen ? 'max-h-fit pb-6' : 'max-h-0 py-0'} overflow-hidden`}>
        {data.detail.length > 0 && (
          <p className="text-primary dark:text-main font-medium text-xl font-raleway my-3 text-left">{data.detail}</p>
        )}
        <div className="flex flex-row gap-x-4 mobile:flex-col mobile:gap-y-4">
          {data.screenRecording && (
            <video
              controls
              className={`my-2 w-1/2 mobile:w-full transition-all duration-300 delay-250 ${
                isOpen ? 'opacity-1 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              <source src={data.screenRecording} type="video/mp4" />
              Your browser does not support the video tag.
              <track kind="captions" srcLang="en" label="English captions" />
            </video>
          )}
          {data.cameraRecording.length > 0 && (
            <video
              controls
              className={`my-2 w-1/2 mobile:w-full transition-all duration-300 delay-250 ${
                isOpen ? 'opacity-1 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              <source src={data.cameraRecording} type="video/mp4" />
              Your browser does not support the video tag.
              <track kind="captions" srcLang="en" label="English captions" />
            </video>
          )}
        </div>
      </div>
    </button>
  );
}

export default Accordion;
