import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CodeBlock = ({ inline, match, children, ...props }) => {

  const [copied, setCopied] = useState(false);

  const copyContentToClipboard = (content: string) => {
    // show copied button, then hide it after 5 seconds
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
    console.log('copyContentToClipboard called');
    navigator.clipboard.writeText(content);
  }

  const copiedButtonContent = (
    <>
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>
      Copied!
    </>
  );

  const copyCodeButtonContent = (
    <>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-lg"
        height="1.3em"
        width="1.3em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
        ></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>Copy code
    </>
  );

  return !inline && match ? (
    <div className="bg-black rounded-md mb-4">
      <div className="flex items-center relative text-gray-200 bg-gray-800 px-4 py-1.5 text-xs font-sans justify-between rounded-t-md">
        <span>{match[1]}</span>
        <button className="flex ml-auto gap-2 text-[12px]" onClick={() => copyContentToClipboard(String(children).replace(/\n$/, ''))}>
          {!copied && copyCodeButtonContent}
          {copied && copiedButtonContent}
        </button>
      </div>
      <SyntaxHighlighter
        {...props}
        children={String(children).replace(/\n$/, '')}
        style={a11yDark}
        className="rounded-b-md overscroll-auto"
        language={match[1]}
        PreTag="div"
      />
    </div>
  ) : (
    <code {...props} className={"text-orange-500 bg-[#202020] rounded p-1"}>
      {children}
    </code>
  )
};

export default CodeBlock;