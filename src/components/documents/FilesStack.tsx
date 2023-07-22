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
    let trimmedLength = 65;
    let leftOffset = 5;
    let rightOffset = 5;

    if (width < 768) { //This is Tailwind's 'md' breakpoint
        componentWidth = 11.5; 
        offset = 11.5;
        initialOffset = 9;
        trimmedLength = 50;
        leftOffset = 3;
        rightOffset = 9.5;
    } else {
        componentWidth = 18.5;
        offset = 19;
        trimmedLength = 65;
        leftOffset = 5;
        rightOffset = 18.5;
    }

    const clicked = () => {
        console.log("clicked");
        setFilesShown(!filesShown);
        console.log(filesShown);
    }

    const trim = (fileName: string): string => {
        // if a file name is too long, trim its middle and replace it with '...'
        if (fileName.length > 80) return fileName.slice(0, trimmedLength / 2) + "..." + fileName.slice(fileName.length - trimmedLength / 2);
        else return fileName;
    }

    let i0 = 0;
    let i1 = 0;
    let backCount = fileNames.length - 6;
    const filesMap: [number, number, string][] = fileNames.map((fileName, index) => {
        if (backCount-- > 0) {
            return [0, 0, fileName]
        }
        return [
            i0++ * 2,
            i1++ * 4,
            trim(fileName)
        ];
    });

    return (
        <div className="group pl-12 pt-7">
            <div className={`relative h-60 sm:h-32 transition-all duration-1000 ease-in-out`}
                style={{
                    width: `${filesShown ? componentWidth * (filesMap.length) - 2.5 : rightOffset}rem`, // 20rem is the default width, 80rem is the width when files are shown
                }}>
                <div className={`w-80 h-40 flex flex-col justify-between p-1 pl-2`} onClick={() => clicked()}>
                    <div className="w-full">
                        <div className="relative w-72 h-40 sm:w-full">
                            {filesMap.map(([_0, _1, fileName]: [number, number, string], index) => {
                                return (
                                    <div className={`group w-72 sm:h-24 sm:w-44 h-40 transform transition-all duration-700 absolute rounded-lg bg-white ease-in-out `
                                        + (filesShown ? `sm:top-10 top-20` : `sm:top-${_0} top-${_1}`)
                                    }
                                        style={{
                                            left: `${filesShown ? ((componentWidth * (filesMap.length - 1)) - (componentWidth * (index))) - leftOffset : (-_1 / (width < 768 ? 8 : 4) - 0.5)}rem`,
                                        }}
                                    >
                                        <div className="w-full h-full flex flex-col justify-between text-black text-justify items-end border-2 border-black absolute rounded-lg break-all text-ellipsis sm:leading-4 overflow-hidden sm:text-sm text-xl p-1">
                                            <img
                                                src={`https://source.boringavatars.com/marble/50/HelloHi?colors=EF233C,FED4E7,313638,003E1F`}
                                                alt="Profile Picture"
                                                className="rounded-full h-[40%]"
                                            />
                                            {fileName}
                                        </div>
                                    </div>
                                );
                            })}
                            {/* <div className="w-full sm:h-24 sm:w-44 h-40 bg-white flex flex-col p-2 justify-between text-black text-end items-end border-2 border-black transform transition-all absolute sm:top-10 top-20 sm:-left-10 -left-20 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12 delay-[0ms]">
                                <img
                                    src={`https://source.boringavatars.com/marble/50/HelloHi?colors=EF233C,FED4E7,313638,003E1F`}
                                    alt="Profile Picture"
                                    className="rounded-full h-[40%]"
                                />
                                "Hello"
                            </div> */}
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
