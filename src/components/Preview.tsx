import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FileData } from "@/utils/types";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";

interface PreviewProps {
  fileOrCollection: FileData[] | FileData | null;
}

export const Preview = (props: PreviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileWidthInRem = 50; // Width of each file in rem units

  const setFileInView = (index: number) => {
    if (props.fileOrCollection === null) return;
    setCurrentIndex(index);

    const fileWidthInPixels =
      fileWidthInRem *
      parseFloat(getComputedStyle(document.documentElement).fontSize);
    const scrollPosition = index * fileWidthInPixels;
    scrollRef.current?.scrollTo({
      top: 0,
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  console.log("Preview", props);

  if (props.fileOrCollection === null) {
    return (<></>);
  }

  return (
    <div className="relative">
      {/* <button
        className="absolute left-0 bottom-20 sm:hidden text-4xl z-10 text-orange-500 border-black px-5 p-2 border-2 rounded-full hover:bg-orange-500 hover:text-black"
        onClick={() => setFileInView(currentIndex - 1)}
      >
        Left
      </button>
      <button
        className="absolute right-0 bottom-20 sm:hidden text-4xl z-10 text-orange-500 border-black px-5 p-2 border-2 rounded-full hover:bg-orange-500 hover:text-black"
        onClick={() => setFileInView(currentIndex + 1)}
      >
        Right
      </button> */}
      {props.fileOrCollection === null &&
        <div className="absolute h-10 text-3xl px-4 py-3 z-10">
          <span className="text-orange-500 underline decoration-white">Collection:</span>
          Podcasts
          {/* TODO: Add a breadcrumbs like extension to the end of the name, with a clickable browser default dropdown so the user can go to any single file in the list. On click the scrollbar scrolls to that file location.*/}
        </div>}
      <div className="flex-col snap-x snap-mandatory border-t-2 sm:border-2 relative bg-black flex overflow-x-auto overscroll-x-contain">
        <div ref={scrollRef} className="flex flex-row flex-nowrap w-full h-[100vh]">
          {props.fileOrCollection !== null && Array.isArray(props.fileOrCollection) && props.fileOrCollection.map((file, index) => (
            <div className="snap-center" key={index}>
              <FilePreview key={index} file={file} active={false} />
            </div>
          ))}
          {
            props.fileOrCollection !== null && !Array.isArray(props.fileOrCollection) &&
            <div className="snap-center">
              <FilePreview key={0} file={props.fileOrCollection} active={false} />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

const FilePreview = (props: FilePreviewProps) => (
  <>
    <div className="flex flex-row mt-10 mx-5 justify-between" style={{ minWidth: 'min(48rem, 80vw)', maxWidth: 'max(48rem, 80vw)' }}>
      <button className="text-white text-lg flex hover:border-orange-500 hover:border-2 border-2 border-black rounded-full items-center invisible">
        Text
      </button>
      {props.file !== undefined && <button className="text-white text-lg flex hover:text-orange-500 hover:border-2 border-2 border-black rounded-full items-center">
        ✏️ Edit
      </button>}
    </div>
    <div className="border-2 sm:border-2 relative bg-black rounded-lg h-[90%] flex flex-col items-start text-left mx-5 overflow-y-auto overscroll-auto" style={{ minWidth: 'min(48rem, 80vw)', maxWidth: 'max(48rem, 80vw)' }}>
      <div className="flex justify-between flex-row w-full px-5">
        {props.file !== undefined && <h1 className="text-4xl text-left mt-5">File Name 1</h1>}
        <h1 className="text-4xl text-right mt-5 hidden">.</h1>
      </div>
      {props.file &&
        props.file.parsedContent &&
        props.file.parsedContent
          .split("the")
          .map((page, index) => (
            <Page key={index} content={page} pgNum={index + 1} />
          ))}
      {props.file === undefined && (
        <button className="h-full w-full flex justify-center items-center text-6xl sm:text-2xl max-w-full p-2 hover:text-orange-500 break-words">
          + Add a new file to this collection?
        </button>
      )}
    </div>
  </>
);


interface FilePreviewProps {
  file: FileData | undefined;
  active: boolean;
}

interface PageProps {
  content: string;
  pgNum: number;
}

const Page = (props: PageProps) => (
  <div className="relative bg-white text-black rounded-lg h-full mx-5 my-1 flex flex-col" style={{ minWidth: 'min(45rem, 80vw)', maxWidth: 'min(45rem, 80vw)' }}>
    <ReactMarkdown
      children={props.content == null ? "" : props.content}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      className="overflow-y-auto break-words m-1"
    />
    <div className="border-t border-black h-4 flex justify-between text-[10px] items-center px-2">
      <p className="text-left"></p>
      <p className="text-right">{"Page " + props.pgNum}</p>
    </div>
  </div>
);
