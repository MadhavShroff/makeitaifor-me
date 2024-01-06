import React, { use, useContext, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from '../Button';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import Img from 'next/image';
// import MathJax from 'react-mathjax';
import 'katex/dist/katex.min.css';
import { emitChatSubmitted } from '@/utils/sockets';
import { Chat, Message, isMessage, isMessageVersionArray } from '@/utils/types';
import { StacksContainer } from './Stacks';
import { MessageVersion, isMessageVersion } from '@/utils/types';
import CodeBlock from './ReactMarkdownComponents/CodeBlock';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { ChatContext } from '@/pages/chat';
import { ChatComponentTopBar } from '../ChatComponentTopBar';
import Link from 'next/link';
import { CustomTable } from './ReactMarkdownComponents/CustomTable';
import { CustomTableCell } from './ReactMarkdownComponents/CustomTableCell';


const ChatComponentContent = ({ chat }) => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("YourChildComponent must be used within a ChatProvider");

  const {
    onChatSubmitted,
    user
  } = context;

  const textareaRef = React.createRef<HTMLTextAreaElement>();

  let messages: JSX.Element[] = [];

  console.log("Chat at ChatComponentContent", chat);

  const [userInteracting, setUserInteracting] = useState(false);
  const scrollableContainerRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;
    if (scrollableContainer) {
      // Check if the user is near the bottom of the chat
      const isNearBottom = scrollableContainer.scrollHeight - scrollableContainer.scrollTop <= scrollableContainer.clientHeight + 100;

      if (isNearBottom && !userInteracting) {
        scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
      }
    }
  }, [messages]);



  if (!chat || !chat.messages) {
    messages = [];
  } else {
    chat.messages.forEach((message: Message | string, index: number) => {
      if (typeof message === 'string') {

        return; // Skip to the next iteration
      } else if (isMessage(message)) {
        if (isMessageVersionArray(message.versions)) {
          const activeVersion = message.versions.find(version => version.isActive);
          if (activeVersion) {
            messages.push(<MessageRow message={activeVersion.text} key={index} who={activeVersion.type} userName={user?.name.split(" ")[0]} />);
          }
        } else {
          console.log("Message versions is not an array");
          // Handle the case where versions array contains strings
        }
      } else {
        throw new Error("Message is not a string or a Message type");
      }
    });
  }

  return (
    <div className="h-full flex flex-col justify-end items-center">
      <div className='w-full overflow-auto h-full overscroll-contain' ref={scrollableContainerRef} onMouseDown={() => setUserInteracting(true)}
        onMouseUp={() => setUserInteracting(false)}
        onTouchStart={() => setUserInteracting(true)}
        onTouchEnd={() => setUserInteracting(false)}>
        {messages.length != 0 && messages}
        {messages.length == 0 &&
          <div className="flex relative flex-col items-center max-h-full justify-start sm:justify-start border-t-2 text-white">
            <ChatComponentTopBar title={chat?.title} chatId={chat?._id}/>
            <div className="h-10 sm:h-24"></div>
            {/* <StacksContainer fileNames={["Hello Hi"]} /> */}
            <div className="h-14 sm:h-30"></div>
            <div className="h-14 sm:h-30"></div>
            <Link
              href="/" className="px-2 py-10 text-2xl font-bold text-white hover:underline decoration-orange-500">
              MakeIt<span className="text-orange-500">Ai</span>For.
              <span className="text-orange-500">Me</span>
            </Link>
            <div className="h-14 sm:h-30"></div>
            <div className="h-14 sm:h-30"></div>
            <p>Heres some stuff you can try out</p>
            <div className='flex flex-col max-w-4xl'>
              <TryOutBox content={[
                "What is this app good for? 💡",
                "Write a blog article about my new seafood restaurant  🦞🍽️",
                "Write all the key Equations to remember for Integration  🧮",
                "Does Joe Rogan ever talk about Bears? 🎙️🐻",
                "Where is this from: \"To be, or not to be: that is the question.\"  📜❓",
                "What exactly is the Higgs Boson?  ⚛️"
              ]} chatId={chat?._id}></TryOutBox>
            </div>
          </div>
        }
      </div>
      <ChatComponentInputField textareaRef={textareaRef} onChatSubmitted={(content) => {
        onChatSubmitted(chat._id, content);
        const scrollableContainer = scrollableContainerRef.current;
        if (scrollableContainer) scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
      }} />
    </div>
  );
}
export default ChatComponentContent;

const ChatComponentInputField = ({ textareaRef, onChatSubmitted }) => {

  const maxHeight = 250;

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = '1.5rem';
    e.target.style.height = `${e.target.scrollHeight > maxHeight ? maxHeight : e.target.scrollHeight}px`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onChatSubmitted(inputValue);
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = '1.5rem';
  };
  return (
    <div className="md:border-t-0 md:border-transparent md:border-transparent pt-2 md:pl-2 md:w-[calc(100%-.5rem)]">
      <form onSubmit={handleFormSubmit} className="stretch mx-2 flex flex-row gap-3 lg:mx-auto lg:max-w-3xl xl:max-w-6xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col" role="presentation">
          <div className="flex flex-row w-full flex-grow md:pl-4 relative border border-black/10 bg-black border-gray-900/50 border-white rounded-xl shadow-xs shadow-xs">
            <textarea
              ref={textareaRef}
              id="prompt-textarea"
              tabIndex={0}
              data-id="root"
              placeholder="Send a message"
              className="m-0 w-full h-[24px] p-0 my-[10px] pr-10 bg-transparent md:pr-12 pl-3 md:pl-0 outline-none resize-none"
              value={inputValue}
              onChange={handleInputChange}
              onInput={handleInputChange}
            ></textarea>
            <button type="submit"
              className={"my-1 mx-1 flex items-center justify-center h-10 w-10 rounded-md transition-colors" +
                (inputValue.length == 0 ? " cursor-default" : " border-2 border-orange-500 bg-black cursor-pointer hover:bg-orange-500")
              }>
              <span data-state="closed">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="h-4 w-4 m-1 md:m-0" strokeWidth="2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="h-4 w-4 m-1 md:m-0" strokeWidth="2"><path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path></svg>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pb-3 pt-2 text-center text-xs text-orange-500 sm:text-[10px]">
        <span>
          This chat Interface may produce inaccurate information about people, places, or facts.
        </span>
      </div>
    </div>
  );
};

const MessageRow = (props) => {
  let who = "";
  if (props.who == 'ai') {
    who = "AI";
  } else if (props.who == 'user') {
    who = props.userName;
  }
  return (
    <div className="flex flex-col md:flex-row w-full justify-start border-t-[1px] text-black mb-2">
      <div className="flex flex-col items-end md:items-start md:w-3/12 mx-2 ml-14 mt-2">
        <div className="flex justify-end">
          <div className="w-3 h-3 m-1 bg-blue-500 rounded-full"></div>
          <div className="text-white mt-1 ml-1 font-bold text-xs text-ellipsis overflow-hidden">{props.who == 'ai' ? "AI" : props.userName}</div>
        </div>
        <div className="text-white mt-1 ml-1 text-xs">Today at 12:34 AM</div>
      </div>
      <div className="flex flex-col w-full md:w-10/12 px-2 text-white markdown overflow-x-scroll break-words max-w-full z-0 my-2 md:my-0">
        <ReactMarkdown
          children={props.message == null ? '' : props.message}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return CodeBlock({ inline, match, children, ...props });
            },
            table: CustomTable,
            thead: ({ children }) => <thead>{children}</thead>,
            tbody: ({ children }) => <tbody>{children}</tbody>,
            th: ({ children }) => <CustomTableCell isHeader={true}>{children}</CustomTableCell>,
            td: ({ children }) => <CustomTableCell isHeader={false}>{children}</CustomTableCell>

          }}
        />
        <div className="flex flex-row md:flex-col justify-between md:justify-start">
          {/* <Button text='Rewrite' _key={1} className='w-fit' /> */}
          {/* <Button text='Reply' _key={2} className='w-fit md:hidden' /> */}
        </div>
      </div>
      <div className="flex flex-col w-full md:w-3/12 my-2 md:my-0">
        {/* <Button text='Reply' _key={3} className='w-fit hidden md:block' /> */}
      </div>
    </div>
  );

}

const TryOutBox = ({ content, chatId }) => {
  // split x into 2 equal sized arrays
  const half = Math.ceil(content.length / 2);
  const firstHalf = content.slice(0, half);
  const secondHalf = content.slice(-half);

  const context = useContext(ChatContext);
  if (!context) throw new Error("YourChildComponent must be used within a ChatProvider");

  const {
    appendContentToMessageInChat,
    appendMessageToChat,
    setChatTitle,
  } = context;

  return (
    <>
      <div className='flex flex-row sm:flex-col sm:mx-2'>
        {firstHalf.map((buttonText, index) => {
          return <button
            key={index}
            className="m-2 text-center max-w-prose text-sm p-2 hover:bg-orange-500 bg-black border-white border-2 rounded-lg"
            onClick={() => emitChatSubmitted(buttonText, chatId, appendMessageToChat, appendContentToMessageInChat, setChatTitle)}>
            {buttonText}
          </button>
        })}
      </div>
      <div className='flex flex-row sm:flex-col sm:mx-2'>
        {secondHalf.map((buttonText, index) => {
          return <button
            key={index}
            className="m-2 text-center max-w-prose text-sm p-2 hover:bg-orange-500 bg-black border-white border-2 rounded-lg"
            onClick={() => emitChatSubmitted(buttonText, chatId, appendMessageToChat, appendContentToMessageInChat, setChatTitle)}>
            {buttonText}
          </button>
        })}
      </div>
    </>
  );
}