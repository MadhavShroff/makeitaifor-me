import React, { useEffect, useState } from 'react';
import { DndContext, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { KeyboardSensor, PointerSensor } from '@dnd-kit/core';
import { useSensor, useSensors } from '@dnd-kit/core';
import Navbar from '@/components/Navbar';
import { fetchDocs, fetchUser, fetchChatContent, fetchChatsMeta } from '@/utils/fetches';
import { ScrollableStackContainer, ScrollableBoxContainer } from '@/components/documents/Stacks';
import Footer from '@/components/Footer';
import LoginPage from '../auth';
import { Chat, ChatComponent, Message } from '@/components/documents/ChatComponent';

type User = {
  id: string;
  name: string;
  username: string;
};

const Documents = () => {
  const [user, setUser] = useState<User | null>(null);
  // const [user, setUser] = useState({ // Mock user
  //   id: "91231123-1230u1u-123132",
  //   name: "John Doe",
  //   username: "john@doe.com"
  // });
  const [docs, setDocs] = useState<string[]>([]); // names of all documents the user has uploaded
  const [chatsMeta, setChatsMeta] = useState<Chat[]>([]);

  const pointerSensorOptions = {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  };

  const sensors = useSensors(
    useSensor(PointerSensor, pointerSensorOptions),
    useSensor(KeyboardSensor),
  );

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  useEffect(() => {
    if (user) fetchDocs(user).then(setDocs).catch(console.error);
    if (user) fetchChatsMeta(user).then(setChatsMeta).catch(console.error);
    // if (user && chatsMeta && chatsMeta[0] && chatsMeta[0].id) fetchChatContent(user, chatsMeta[0].id).then(setChatContent).catch(console.error);
    // setDocs(["Hello Hi", "How", "Are", "You", "Doing", "Today", "On", "This", "Blessed", "Day"]);
    setChatsMeta(mockChats);
  }, [user]);

  const handleDragStart = (event: DragStartEvent) => {
    console.log(`Drag started: ${event.active.id}`);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    console.log(`Drag moved: ${event.active.id}`);
  }

  const handleDragOver = (event: DragOverEvent) => {
    console.log(`Drag over: ${event.active.id}`);
  }

  const handleDragEnd = (event) => {
    // Dragged-from id is active.id
    console.log(`Dragged from: ${event.active.id}`);

    // Dragged-to id is over.id. It can be null if the item was not dragged over a droppable area.
    if (event.over) {
      console.log(`Dragged to: ${event.over.id}`);

    } else {
      console.log('The item was not dragged over a droppable area');
    }
  }

  return (
    <main className={'flex flex-col overflow-hidden'}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Navbar user={user} />
        {user && <div className=''>
          <ScrollableStackContainer fileNames={docs} />
          <ChatComponent 
            chatsMeta={chatsMeta} 
            onNewChatClicked={() => {setChatsMeta([{"content": null, "id": "temp", "title" : "New Chat"}, ...chatsMeta])}}
            onChatSubmitted={(chatId : string) => {
              console.log("Chat submitted " + chatId + " for user " + user.username);
            }}
          />
        </div>}
        {user == null &&
          <LoginPage />
        }
        <Footer />
      </DndContext>
    </main>
  );
};

export default Documents;

const md0 = [
  "## Heres some math:",
  "$$",
  "\\begin{align*}",
  "\\mathcal{L}*{\\mathrm{Higgs}} = (D*\\mu \\phi)^\\dagger (D^\\mu \\phi) - \\mu^2 \\phi^\\dagger \\phi - \\lambda (\\phi^\\dagger \\phi)^2",
  "\\end{align*}",
  "$$",
  "where $\\mathcal{L}{\\mathrm{Higgs}}$ is the Higgs Lagrangian, $D\\mu$ is the covariant derivative, $\\phi$ is the Higgs field, $\\mu^2$ is the mass term, and $\\lambda$ is the self-interaction term.",
  "",
  "The equation represents the Lagrangian density of the Higgs field in the context of the Standard Model of particle physics. The Higgs field is a scalar field that is responsible for the generation of mass for elementary particles such as the W and Z bosons and the fermions.",
  "",
  "The Lagrangian density consists of three terms:",
  "",
  "The first term represents the kinetic energy of the Higgs field. It is given by $(D\\mu \\phi)^\\dagger (D^\\mu \\phi)$, where $\\phi$ is the Higgs field and $D_\\mu$ is the covariant derivative. The covariant derivative is used to ensure that the Lagrangian is invariant under local gauge transformations.",
  "",
  "The second term represents the potential energy of the Higgs field. It is given by $-\\mu^2 \\phi^\\dagger \\phi$, where $\\mu$ is a constant parameter known as the Higgs mass parameter.",
  "",
  "The third term represents the self-interaction of the Higgs field. It is given by $-\\lambda (\\phi^\\dagger \\phi)^2$, where $\\lambda$ is a positive constant parameter known as the Higgs quartic coupling.", "The equation describes the behavior of the Higgs field in the presence of other particles and fields in the Standard Model. The dynamics of the Higgs field are determined by the principle of least action, which leads to the equations of motion for the field. The Higgs field is a scalar field, which means that it has a single degree of freedom, and it interacts with other particles in the Standard Model through the exchange of gauge bosons."
];

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

const md2 = [
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

const content1: Message[] = [{
  id: "1",
  content: md0,
  whoSent: "John Doe",
  whenSent: new Date("2021-09-25T20:00:00.000Z")
},
];

const content3: Message[] = [{
  id: "1",
  content: md1,
  whoSent: "John Doe",
  whenSent: new Date("2021-09-25T20:00:00.000Z")
}];

const content2: Message[] = [{
  id: "234",
  content: md2,
  whoSent: "John Doe",
  whenSent: new Date("2021-09-25T20:02:00.000Z")
}];

const content4: Message[] = [{
  id: "234",
  content: md0,
  whoSent: "John Doe",
  whenSent: new Date("2021-09-25T20:02:00.000Z")
}];

export const mockChats = [ // metadata of all chats of the user
  {
    id: "345",
    title: "Hello",
    content: content1
  },
  {
    id: "135",
    title: "Some title",
    content: content2
  },
  {
    id: "142",
    title: "Hello 2",
    content: content3,
  },
  {
    id: "153",
    title: "Some title 3",
    content: content4,
  },
]