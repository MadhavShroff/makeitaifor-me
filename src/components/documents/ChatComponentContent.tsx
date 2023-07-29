import React, { use, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from '../Button';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import Img from 'next/image';
// import MathJax from 'react-mathjax';
import 'katex/dist/katex.min.css';
import { Chat, Message } from './ChatComponent';
import { sendButtonClicked } from '@/utils/sockets';

const ChatComponentInputField = ({ handleFormSubmit, inputValue, handleInputChange }) =>
  <div className="md:border-t-0 border-white/20 md:border-transparent md:border-transparent md:bg-vert-light-gradient pt-2 md:pl-2 md:w-[calc(100%-.5rem)]">
    <form onSubmit={handleFormSubmit} className="stretch mx-2 flex flex-row gap-3 lg:mx-auto lg:max-w-3xl xl:max-w-6xl">
      <div className="relative flex h-full flex-1 items-stretch md:flex-col" role="presentation">
        <div className="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-black border-gray-900/50 text-white bg-gray-700 rounded-xl shadow-xs shadow-xs">
          <textarea
            id="prompt-textarea"
            tabIndex={0}
            data-id="root"
            rows={1}
            placeholder="Send a message"
            className="m-0 w-full h-full border-0 bg-transparent p-0 pr-10 bg-transparent md:pr-12 pl-3 md:pl-0"
            style={{ maxHeight: '200px', height: '24px', overflowY: 'hidden' }}
            value={inputValue}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit" className="absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 hover:bg-gray-900 disabled:hover:bg-transparent right-2 text-orange-500 bottom-1.5 transition-colors">
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
        <a href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes" target="_blank" rel="noreferrer" className="underline">
          ChatGPT May 24 Version
        </a>
      </span>
    </div>
  </div>

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
    <div className="flex flex-row w-full h-fit justify-start border-t-2 text-black">
      <div className="flex flex-col w-3/12 mt-14">
        <div className="ml-2 mt-1">
          <div className="w-3 h-3 m-1 bg-blue-500 rounded-full"></div>
          <div className="text-white mt-1 ml-1 font-bold text-xs">John Doe</div>
          <div className="text-white ml-1 text-xs">Today at 12:34 AM</div>
        </div>
      </div>
      <div className='flex flex-col w-10/12 text-white markdown overflow-x-scroll' style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
        <ReactMarkdown
          children={props.message == null ? '' : props.message}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
        // components={customComponents}
        />
        {/* <MathJax.Provider input="tex">
         </MathJax.Provider> */}
        <div>
          <Button text='Rewrite' _key={1} className='w-fit' />
          <Button text='Reply' _key={1} className='w-fit' />
        </div>
      </div>
      <div className='flex flex-col w-3/12'>
        <Button text='Reply' _key={1} className='w-fit' />
      </div>
    </div>
  );
}


type ChatComponentContentState = {
  inputValue: string;
};

type ChatComponentContentProps = {
  chat: Chat | undefined;
  onChatSubmitted: (chatId: string) => void;
};

const TryOutBox = ({content}) => {
  return (
    <button className="w-48 m-2 text-center max-w-prose p-2 hover:bg-orange-500 bg-black border-white border-2 rounded-lg" onClick={() => sendButtonClicked(content)}>
      {content}
    </button>
  );
}

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
    console.log(this.props.chat);

    if (this.props.chat == undefined) {
      messages = [];
    } else if (this.props.chat.content == null) {
      messages = [];
    } else {
      // messages = [];
      this.props.chat.content.forEach((message: Message) => {
        messages.push(<MessageRow message={message.content?.join('\n')} />);
      });
    }

    return (
      <div className="h-full flex flex-col justify-end items-center">
        <div className='w-full overflow-auto h-full'>
          {messages.length != 0 && messages}
          {messages.length == 0 &&
            <div className="flex flex-row w-full h-full justify-start border-t-2 text-black">
              <div className="flex flex-col w-4/12 mt-14"></div>
              <div className='flex flex-col w-6/12 text-white items-center justify-center overflow-x-scroll' style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
                <Img
                  src={"/logo_nobg.png"}
                  alt="Logo"
                  width={500}
                  height={1200}
                />
                <p>Heres some stuff you can try out</p>
                <div className='flex flex-row '>
                  <TryOutBox content={"What is this application good for?"} />
                  <TryOutBox content={"List all relevant facts from this collection"} />
                  <TryOutBox content={"Summarize all key points of this podcast episode"} />
                </div>
                <div className='flex flex-row '>
                  <TryOutBox content={"What is this application good for?"} />
                  <TryOutBox content={"List all relevant facts from this collection"} />
                  <TryOutBox content={"Summarize all key points of this podcast episode"} />
                </div>
              </div>
              <div className='flex flex-col w-4/12'>
                <Button text='Reply' _key={1} className='w-fit' />
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