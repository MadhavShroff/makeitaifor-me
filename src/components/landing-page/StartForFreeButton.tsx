import React, { FC } from 'react';

const StartForFreeButton : FC = () => {
  return (
    <button
      key="1"
      className={"px-6 sm:px-4 py-4 mt-4 text-4xl border bg-white rounded-full hover:bg-orange-500 whitespace-nowrap font-bold m-1 text-black border-white hover:text-white hover:border-black "} >
        {"Start for Free →"}
    </button>
  );
}
  
export default StartForFreeButton;