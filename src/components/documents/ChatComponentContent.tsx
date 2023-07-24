import React, { use, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from '../Button';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
// import MathJax from 'react-mathjax';
import 'katex/dist/katex.min.css';

const ChatComponentInputField = ({ handleFormSubmit, inputValue, handleInputChange }) =>
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

const ChatRow = (props) => {
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
      <div className="flex flex-col w-4/12 mt-14">
        <div className="ml-2 mt-1">
          <div className="w-3 h-3 m-1 bg-blue-500 rounded-full"></div>
          <div className="text-white mt-1 ml-1 font-bold text-xs">John Doe</div>
          <div className="text-white ml-1 text-xs">Today at 12:34 AM</div>
        </div>
      </div>
      <div className='flex flex-col w-6/12 text-white markdown overflow-x-scroll' style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
          <ReactMarkdown
            children={props.message}
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
      <div className='flex flex-col w-4/12'>
        <Button text='Reply' _key={1} className='w-fit' />
      </div>
    </div>
  );
}


type ChatComponentContentState = {
  inputValue: string,
  messages: string[],
};

type ChatComponentContentProps = {
  // add any props here
};

const md1 = [
  "## How to use",
  "Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:",
  "",
  "```bash",
  "npx create-next-app --example blog-starter blog-starter-app",
  "```",
  "```bash",
  "# github-markdown-css",
  "> The minimal amount of CSS to replicate the GitHub Markdown style",
  "**The CSS is generated. Contributions should go to [this repo](https://github.com/sindresorhus/generate-github-markdown-css).**",
  "[<img src=\"https://cloud.githubusercontent.com/assets/170270/5219062/f22a978c-7685-11e4-8316-af25b6c89bc0.png\" width=\"300\">](http://sindresorhus.com/github-markdown-css)",
  "## [Demo](https://sindresorhus.com/github-markdown-css)",
  "## Install",
  "Download [manually](https://raw.githubusercontent.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css), from [CDNJS](https://cdnjs.com/libraries/github-markdown-css), or with npm:",
  "```sh",
  "npm install github-markdown-css",
  "```",
  "## Usage",
  "Import the `github-markdown.css` file and add a `markdown-body` class to the container of your rendered Markdown and set a width for it. GitHub uses `980px` width and `45px` padding, and `15px` padding for mobile.",
  "```html",
  "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
  "<link rel=\"stylesheet\" href=\"github-markdown.css\">",
  "<style>",
  ".markdown-body {",
  "  box-sizing: border-box;",
  "  min-width: 200px;",
  "  max-width: 980px;",
  "  margin: 0 auto;",
  "  padding: 45px;",
  "}",
  "@media (max-width: 767px) {",
  "  .markdown-body {",
  "    padding: 15px;",
  "  }",
  "}",
  "</style>",
  "<article class=\"markdown-body\">",
  "  <h1>Unicorns</h1>",
  "  <p>All the things</p>",
  "</article>",
  "```",
  "You can use [GitHub's `/markdown` API](https://docs.github.com/en/free-pro-team@latest/rest/reference/markdown) to turn Markdown into the HTML that GitHub generates, which works well with the CSS in this repo. Other Markdown parsers will mostly work with these styles too. To mimic how GitHub highlights code, you can use [`starry-night`](https://github.com/wooorm/starry-night) with your Markdown parser of choice.",
  "There are 3 themes provided in this package:",
  "- **github-markdown.css**: (default) Automatically switches between light and dark through [`@media (prefers-color-scheme)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).",
  "- **github-markdown-light.css**: Light-only.",
  "- **github-markdown-dark.css**: Dark-only.",
  "You may know that now GitHub supports more than 2 themes including `dark_dimmed`, `dark_high_contrast` and `colorblind` variants. If you want to try these themes, you can generate them on your own! See next section.",
  "## How",
  "See [`generate-github-markdown-css`](https://github.com/sindresorhus/generate-github-markdown-css) for how it's generated and ability to generate your own.",
  "## Dev",
  "Run `npm run make` to update the CSS."
];


const exampleMarkdown = [
  "# Header 1",
  "This is a paragraph with **bold text** and *italic text*.",
  "## Header 2",
  "This is a link: [OpenAI](https://openai.com)",
  "### Header 3",
  "This is a bullet list:",
  "- Bullet 1",
  "- Bullet 2",
  "  - Bullet 2.1",
  "This is a numbered list:",
  "1. Number 1",
  "2. Number 2",
  "#### Header 4",
  "This is a table:",
  "| Column 1 | Column 2 |",
  "|--------- |--------- |",
  "| Cell 1   | Cell 2   |",
  "##### Header 5",
  "This is some inline `code`.",
  "Here's a block of code:",
  "```javascript",
  "const hello = 'Hello, world!';",
  "console.log(hello);",
  "```",
  "###### Header 6",
  "This is a blockquote:",
  "> Quote",
  "And this is an image:",
  "![alt text](https://placekitten.com/200/300)",
  "Lastly, some inline math $ x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a} $ and a math block:",
  "$$",
  "\\begin{align*}",
  "x &= {-b \\pm \\sqrt{b^2-4ac} \\over 2a} \\\\",
  "y &= mx + b \\\\",
  "\\end{align*}",
  "$$",
];


class ChatComponentContent extends React.Component<ChatComponentContentProps, ChatComponentContentState> {

  constructor(props: ChatComponentContentProps) {
    super(props);
    this.state = {
      inputValue: '',
      messages: [
        [
          "## Heres some math:",
          "$$",
          "\\begin{align*}",
          "\\mathcal{L}*{\\mathrm{Higgs}} = (D*\\mu \\phi)^\\dagger (D^\\mu \\phi) - \\mu^2 \\phi^\\dagger \\phi - \\lambda (\\phi^\\dagger \\phi)^2",
          "\\end{align*}",
          "$$",
          "where $\\mathcal{L}{\\mathrm{Higgs}}$ is the Higgs Lagrangian, $D\\mu$ is the covariant derivative, $\\phi$ is the Higgs field, $\\mu^2$ is the mass term, and $\\lambda$ is the self-interaction term.",
          "",
          "Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:",
          "",
          "```bash",
          "npx create-next-app --example blog-starter blog-starter-app",
          "```",
          "```bash",
          "yarn create next-app --example blog-starter blog-starter-app",
          "```",
          "```bash",
          "pnpm create next-app --example blog-starter blog-starter-app",
          "```",
          "Your blog should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).",
          "",
          "Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).",
          "",
          "# Notes",
          "`blog-starter` uses [Tailwind CSS](https://tailwindcss.com) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3)."
        ].join('\n'),
        md1.join('\n'),
        exampleMarkdown.join('\n'),
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: e.target.value });
  }

  handleFormSubmit(e: React.FormEvent) {
    console.log("Form submitted");
    e.preventDefault();

    this.setState((prevState) => ({
      messages: [...prevState.messages, this.state.inputValue],
      inputValue: ''
    }));
    console.log(this.state.messages);
  }

  render() {
    let chats: JSX.Element[] = [];
    console.log(this.state.messages.length);
    for (let i = 0; i < this.state.messages.length; i++)
      chats.push(<ChatRow message={this.state.messages[i]} />);
    return (
      <div className="h-full flex flex-col justify-end items-center">
        <div className='w-full overflow-auto h-full'>
          {chats}
        </div>
        Hello
        <ChatComponentInputField handleFormSubmit={this.handleFormSubmit} inputValue={this.state.inputValue} handleInputChange={this.handleInputChange} />
      </div>
    );
  }
}


export default ChatComponentContent;