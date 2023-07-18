import React, { FC, useEffect, useState } from 'react';

function useViewportWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  return windowWidth;
}


export const FilesStack: FC<{ fileNames: string[] }> = ({ fileNames }: { fileNames: string[] }) => {

    const [filesShown, setFilesShown] = useState(false);

    const width = useViewportWidth();

    //Here you can decide what values you want to assign based on the viewport's width.
    let componentWidth = 20;
    let offset = 19;
    let initialOffset = 14;

    if (width < 768) { //This is Tailwind's 'md' breakpoint
        componentWidth = 10; //Replace these values with the ones you want.
        offset = 11.5;
        initialOffset = 9;
    } else {
        componentWidth = 18.5;
        offset = 19;
    }

    const clicked = () => {
        console.log("clicked");
        setFilesShown(!filesShown);
        console.log(filesShown);
    }

    return (
        <div className="group pl-16 sm:pl-12 pt-7">
            <div className={`relative h-60 sm:w-40 sm:h-32 transition-all duration-1000`}
                style={{
                    width: `${filesShown ? 80 : componentWidth}rem`, // 20rem is the default width, 80rem is the width when files are shown
                }}>
                <div className={`sm:w-full w-80 h-40 flex flex-col justify-between p-1 pl-2`} onClick={() => clicked()}>
                    <div className="w-full">
                        <div className="relative w-72 h-40 sm:w-full">
                            {[[0, 0], [2, 4], [4, 8], [6, 12], [8, 16], [10, 20]].map(([_0, _1], index) => {
                                const _rev = 4 - index;
                                return (
                                    <div className={`group w-full sm:h-24 sm:w-44 h-40 transform transition-all duration-1000 absolute rounded-lg bg-blue-500 `
                                        + (filesShown ? `sm:top-6 top-12` : `sm:top-${_0} top-${_1}`)
                                    }
                                        style={{
                                            left: `${filesShown ? initialOffset + _rev * offset : -_1 / (width < 768 ? 8 : 4)}rem`,
                                        }}
                                    >
                                        <div className="w-full h-full flex flex-col justify-center text-white items-center sm:border-2 border-4 border-white absolute rounded-lg text-3xl p-2">{index}</div>
                                    </div>
                                );
                            })}
                            {/* <div className="group w-full sm:h-24 sm:w-44 h-40 flex flex-col items-center transform transition-all absolute sm:top-10 top-20 sm:-left-10 -left-20 rounded-lg bg-blue-500">
                                <div className="w-full h-full flex flex-col justify-center text-white items-center border-4 border-white absolute rounded-lg text-3xl p-2 visible group-hover:invisible">
                                    Upload File(s) +
                                </div>
                                <div className="w-full h-full flex flex-col justify-center text-white items-center border-4 border-white absolute rounded-lg text-3xl p-2 invisible group-hover:visible text-center">
                                    Click here or Drag and Drop to Upload +
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

const FileUploadComponent: FC = () => {
    return (
        <div className='flex sm:flex-col flex-row'>
            <FilesStack fileNames={["Hello Hi"]}/>
        </div>
    );
}

export default FileUploadComponent;
