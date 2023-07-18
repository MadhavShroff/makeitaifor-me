import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';


const ChatComponentInputField = ({handleFormSubmit, inputValue, handleInputChange}) =>
    <div className="md:border-t-0 border-white/20 md:border-transparent md:border-transparent md:bg-vert-light-gradient pt-2 md:pl-2 md:w-[calc(100%-.5rem)]">
        <form onSubmit={handleFormSubmit} className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1 items-stretch md:flex-col" role="presentation">
                <div className="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-black border-gray-900/50 text-white bg-gray-700 rounded-xl shadow-xs shadow-xs">
                    <textarea
                        id="prompt-textarea"
                        tabIndex={0}
                        data-id="root"
                        rows={1}
                        placeholder="Send a message"
                        className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 bg-transparent md:pr-12 pl-3 md:pl-0"
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

const MDXChat = ({content}) => {
    return (
        <ReactMarkdown>
            {content}
        </ReactMarkdown>
    );
}

function ChatComponentContent() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<string[]>(["Hello", "World"]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setMessages([...messages, inputValue]);
        setInputValue('');
    }

    let chats: JSX.Element[] = [];
    for (let i = 0; i < messages.length; i++) chats.push(<MDXChat content={messages[i]} />);

    return (
        <div className="w-auto h-full flex flex-col justify-end items-center">
            <div className='text-white'>
                {chats}
            </div>
            <ChatComponentInputField handleFormSubmit={handleFormSubmit} inputValue={inputValue} handleInputChange={handleInputChange} />
        </div>
    );
}

export default ChatComponentContent;