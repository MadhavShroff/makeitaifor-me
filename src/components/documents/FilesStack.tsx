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


export const FilesStack: FC<{ fileNames: {name: string, id: string}[], fileOrStackClicked: (id: string | null) => void, fileSelected: string | null }> = ({ fileNames, fileOrStackClicked, fileSelected = null }: { fileNames: {name: string, id: string}[], fileOrStackClicked: (id: string|null) => void, fileSelected: string|null }) => {

    const filesShown = fileSelected !== null;

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

    const trim = (fileName: string): string => {
        // if a file name is too long, trim its middle and replace it with '...'
        if (fileName.length > 80) return fileName.slice(0, trimmedLength / 2) + "..." + fileName.slice(fileName.length - trimmedLength / 2);
        else return fileName;
    }

    let i0 = 0;
    let i1 = 0;
    let backCount = fileNames.length - 6;

    const filesMap: [number, number, string, string][] = fileNames.map((ob, index) => {
        const id = ob.id;
        if (backCount-- > 0) {
            return [0, 0, ob.name, id]
        }
        return [
            i0++ * 2,
            i1++ * 4,
            trim(ob.name),
            id
        ];
    });

    if(filesMap.length === 0) return (<></>);

    return (
        <div className="group pl-12 pt-7">
            <div className={`relative h-60 sm:h-32 transition-all duration-1000 ease-in-out`}
                style={{
                    width: `${filesShown ? componentWidth * (filesMap.length) - 2.5 : rightOffset}rem`, // 20rem is the default width, 80rem is the width when files are shown
                }}>
                <div className={`w-80 h-40 flex flex-col justify-between p-1 pl-2`}>
                    <div className="w-full">
                        <div className="relative w-72 h-40 sm:w-full">
                            {filesMap.map(([_0, _1, fileName, id]: [number, number, string, string], index) => {
                                return (
                                    <button onClick={() => {
                                        fileSelected === id ? fileOrStackClicked(null) : fileOrStackClicked(id);
                                    }} className='' key={index}>
                                        <div className={`group w-72 sm:h-24 sm:w-44 h-40 transform transition-all duration-700 absolute rounded-lg hover:bg-orange-500 ease-in-out `
                                            + (filesShown ? `sm:top-10 top-20` : `sm:top-${_0} top-${_1}`)
                                            + (fileSelected === id ? ` bg-orange-500` : ` bg-white`)
                                        }
                                            style={{
                                                left: `${filesShown ? ((componentWidth * (filesMap.length - 1)) - (componentWidth * (index))) - leftOffset : (-_1 / (width < 768 ? 8 : 4) - 0.5)}rem`,
                                            }}
                                        >
                                            <div className={
                                                "w-full h-full flex flex-col justify-between text-black text-justify items-end transform transition-all ease-in-out hover:border-4 hover:border-white hover:text-3xl absolute rounded-lg break-all text-ellipsis sm:leading-4 overflow-hidden p-1"
                                                + (fileSelected === id ? ` border-4 border-white text-3xl sm:text:2xl` : ` border-2 border-black text-xl sm:text-sm`)
                                            }>
                                                <img
                                                    src={`https://source.boringavatars.com/marble/50/HelloHi?colors=EF233C,FED4E7,313638,003E1F`}
                                                    alt="Profile Picture"
                                                    className="rounded-full h-[30%]"
                                                />
                                                {fileName}
                                            </div>
                                        </div>
                                    </button>
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
