import React, { use, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from '../Button';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import Img from 'next/image';
// import MathJax from 'react-mathjax';
import 'katex/dist/katex.min.css';
import { emitTryButtonClicked } from '@/utils/sockets';
import { Chat, Message } from '@/utils/types';

type ChatComponentContentState = { inputValue: string; };

type ChatComponentContentProps = {
  chat: Chat | undefined;
  onChatSubmitted: (chatId: string) => void;
  appendMessageToChat: (chatId: string) => string;
  appendContentToMessageInChat: (chatId: string, messageId: string, content: string) => void;
};

class ChatComponentContent extends React.Component<ChatComponentContentProps, ChatComponentContentState> {

  constructor(props: ChatComponentContentProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: e.target.value });
  }

  handleFormSubmit(e: React.FormEvent) {
    console.log("Form submitted");
    this.props.onChatSubmitted(this.props.chat?.id ?? '');
    e.preventDefault();
  }

  render() {
    let messages: JSX.Element[] = [];
    // console.log(this.props.chat);

    if (this.props.chat == undefined) {
      messages = [];
    } else if (this.props.chat.messages == null) {
      messages = [];
    } else {
      this.props.chat.messages.forEach((message: Message, index: number) => {
        messages.push(<MessageRow message={message.content} key={index}/>);
      });
    }

    return (
      <div className="h-full flex flex-col justify-end items-center">
        <div className='w-full overflow-auto h-full'>
          {messages.length != 0 && messages}
          {messages.length == 0 &&
            <div className="flex flex-col items-center h-full justify-center sm:justify-start border-t-2 text-white">
              <Img
                src={"/logo_nobg.png"}
                alt="Logo"
                width={1000}
                height={1000}
                className="object-contain w-[50%] h-[50%] sm:w-full sm:h-full"
              />
              <p>Heres some stuff you can try out</p>
              <div className='flex flex-col max-w-xl'>
                <div className='flex flex-row sm:flex-col'>
                  {["What is the Higgs Boson? Explain it to me with math using inline Latex Equations", "Write an article using markdown", "Summarize all key points of this podcast episode"].map((content) => {
                    return <TryOutBox content={content} appendContentToMessageInChat={this.props.appendContentToMessageInChat} appendMessageToChat={this.props.appendMessageToChat} />;
                  })}
                </div>
                <div className='flex flex-row sm:flex-col'>
                  {["What is this app good for?", "Summarize all key points of this podcast episode", "Write all the important math formulas in Integration, with Latex inline"].map((content) => {
                    return <TryOutBox content={content} appendContentToMessageInChat={this.props.appendContentToMessageInChat} appendMessageToChat={this.props.appendMessageToChat} />;
                  })}
                </div>
              </div>
            </div>
          }
        </div>
        <ChatComponentInputField handleFormSubmit={this.handleFormSubmit} inputValue={this.state.inputValue} handleInputChange={this.handleInputChange} />
      </div>
    );
  }
}


export default ChatComponentContent;

const ChatComponentInputField = ({ handleFormSubmit, inputValue, handleInputChange }) => {
  const maxHeight = 250;
  const handleInput = (e) => {
    handleInputChange(e);
    e.target.style.height = '1.5rem'; // reset height to minimum height value
    e.target.style.height = `${e.target.scrollHeight > maxHeight ? maxHeight : e.target.scrollHeight}px`; // set to scrollHeight to expand as needed upto max-height
  };

  return (
    <div className="md:border-t-0 md:border-transparent md:border-transparent pt-2 md:pl-2 md:w-[calc(100%-.5rem)]">
      <form onSubmit={handleFormSubmit} className="stretch mx-2 flex flex-row gap-3 lg:mx-auto lg:max-w-3xl xl:max-w-6xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col" role="presentation">
          <div className="flex flex-row w-full flex-grow md:pl-4 relative border border-black/10 bg-black border-gray-900/50 border-white rounded-xl shadow-xs shadow-xs">
            <textarea
              id="prompt-textarea"
              tabIndex={0}
              data-id="root"
              placeholder="Send a message"
              className="m-0 w-full h-[24px] p-0 my-[10px] pr-10 bg-transparent md:pr-12 pl-3 md:pl-0 outline-none resize-none"
              value={inputValue}
              onChange={handleInput}
              onInput={handleInput}
            ></textarea>
            <button type="submit" 
              className={"my-1 mx-1 flex items-center justify-center h-10 w-10 rounded-md transition-colors" + 
                (inputValue.length == 0 ? " cursor-default" : " border-2 border-orange-500 bg-black cursor-pointer hover:bg-orange-500")
              }>
              <span data-state="closed">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="h-4 w-4 m-1 md:m-0" stroke-width="2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="h-4 w-4 m-1 md:m-0" stroke-width="2"><path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path></svg>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pb-3 pt-2 text-center text-xs text-orange-500">
        <span>
          This chat Interface may produce inaccurate information about people, places, or facts.
        </span>
      </div>
    </div>
  );
};


const MessageRow = (props) => {
  const customComponents = {
    h1: ({ node, ...props }) => <h1 className="my-heading1" {...props} />,
    h2: ({ node, ...props }) => <h2 className="my-heading2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="my-heading3" {...props} />,
    h4: ({ node, ...props }) => <h4 className="my-heading4" {...props} />,
    p: ({ node, ...props }) => <p className="my-paragraph" {...props} />,
    a: ({ node, ...props }) => <a className="my-anchor" {...props} />,
    img: ({ node, ...props }) => <img className="my-image" {...props} />,
    code: ({ node, ...props }) => <code className="my-code" {...props} />,
    // Add more mappings for each HTML tags
  };
  return (
    <div className="flex flex-col md:flex-row w-full justify-start border-t-2 text-black prose">
      <div className="flex flex-col items-end md:items-start md:w-3/12 mx-2 ml-14 mt-2">
        <div className="flex justify-end">
          <div className="w-3 h-3 m-1 bg-blue-500 rounded-full"></div>
          <div className="text-white mt-1 ml-1 font-bold text-xs text-ellipsis overflow-hidden">John Doed</div>
        </div>
        <div className="text-white mt-1 ml-1 text-xs">Today at 12:34 AM</div>
      </div>
      <div className="flex flex-col w-full md:w-10/12 px-2 text-white markdown overflow-x-scroll break-words max-w-full z-0 my-2 md:my-0">
        <ReactMarkdown
          children={props.message == null ? '' : props.message}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
        // components={customComponents}
        />
        {/* <MathJax.Provider input="tex">
         </MathJax.Provider> */}
        <div className="flex flex-row md:flex-col justify-between md:justify-start">
          <Button text='Rewrite' _key={1} className='w-fit' />
          <Button text='Reply' _key={2} className='w-fit md:hidden' />
        </div>
      </div>
      <div className="flex flex-col w-full md:w-3/12 my-2 md:my-0">
        <Button text='Reply' _key={3} className='w-fit hidden md:block' />
      </div>
    </div>
  );

}

const TryOutBox = ({ content, appendContentToMessageInChat, appendMessageToChat }) => {
  return (
    <button className="m-2 text-center max-w-prose p-2 hover:bg-orange-500 bg-black border-white border-2 rounded-lg"
      onClick={() => emitTryButtonClicked(content, appendMessageToChat, appendContentToMessageInChat)}>
      {content}
    </button>
  );
}