import React, { useEffect, useState } from 'react';
import { DndContext, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { KeyboardSensor, PointerSensor } from '@dnd-kit/core';
import { useSensor, useSensors } from '@dnd-kit/core';
import Navbar from '@/components/Navbar';
import { fetchFilesMetaData, fetchUser, fetchDocumentContent } from '@/utils/fetches';
import { ScrollableStackContainer } from '@/components/documents/Stacks';
import Footer from '@/components/Footer';
import LoginPage from '../auth';
import { Chat, Message, User, FileData, S3MetaData } from '@/utils/types';
import Preview from '@/components/Preview/Preview';

export type FileNameAndId = { name: string, fileKey: string };

const Documents = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fileNamesArr, setFileNamesArr] = useState<FileNameAndId[]>([]);
  const [fileSelected, setFileSelected] = useState<string | null>(null); // meta.Key
  const [filesData, setFilesData] = useState<FileData[]>([]);
  useEffect(() => {
    fetchUser(setUser);
    // setUser({ // Mock user
    //   id: "915b7cd5-08c1-45c2-9709-7585af332ee4",
    //   name: "John Doe",
    //   username: "john@doe.com"
    // });
  }, []);

  useEffect(() => {
    if (user) fetchFilesMetaData(user.userId).then((metas) => {
      setFilesData(metas.map((meta: S3MetaData) => {
        return {
          meta: meta,
          parsedContent: null
        }
      }));
      setFileNamesArr(metas.sort((a, b) => new Date(a.LastModified).getTime() - new Date(b.LastModified).getTime()).map((meta: S3MetaData) => {
        const fileName = meta.Key.split('/')[1];
        return {
          name: fileName.length > 70 ? fileName.substring(0, 70) + '...' + fileName.split('.')[1] : fileName,
          fileKey: meta.Key
        }
      }));
    }).catch(console.error);
    // setFileNamesArr(["Hello", "World"])
  }, [user]);

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

  const fileOrStackClicked = (key: string) => {
    console.log('File or stack clicked : ' + key);
    const fileData = filesData.find((file) => file.meta.Key == key);
    if (!(fileData && fileData.parsedContent)) {
      fetchDocumentContent(key, (fileContent: string) => {
        const newFilesData = filesData.map((file) => {
          if (file.meta.Key == key) {
            return {
              meta: file.meta,
              parsedContent: fileContent
            };
          } else {
            return file;
          }
        });
        setFilesData(newFilesData);
      });
    }
    setFileSelected(key);
  }

  const selectedFileOrCollection = filesData.find(file => file.meta.Key === fileSelected);

  return (
    <main className={'flex flex-col overflow-hidden'}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Navbar user={user} />
        {<div className='h-[96vh]'>
          <ScrollableStackContainer fileNames={fileNamesArr} fileOrStackClicked={fileOrStackClicked} fileSelected={fileSelected} />
          <Preview fileOrCollection={selectedFileOrCollection ? selectedFileOrCollection : null} />
        </div>}
        {false &&
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
].join("\n");

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
].join("\n");

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
].join("\n");

const messages1: Message[] = [
  {
    versions: ["1"],
    previousVersion: null,
    _id: "1",
  },{
    versions: ["2"],
    previousVersion: null,
    _id: "1",
  },{
    versions: ["3"],
    previousVersion: null,
    _id: "1",
  }
];

const messages2: Message[] = [
  {
    versions: [{
      _id: "1",
      text: md1,
      type: 'user',
      isActive: true,
      createdAt: new Date("2021-09-25T20:00:00.000Z"),
      updatedAt: new Date("2021-09-25T20:00:00.000Z"),
      __v: 0,
      versionNumber: 1
    }],
    previousVersion: null,
    _id: "1",
  },{
    versions: [{
      _id: "1",
      text: md0,
      type: 'user',
      isActive: true,
      createdAt: new Date("2021-09-25T20:00:00.000Z"),
      updatedAt: new Date("2021-09-25T20:00:00.000Z"),
      __v: 0,
      versionNumber: 1
    }],
    previousVersion: null,
    _id: "1",
  },{
    versions: [{
      _id: "1",
      text: md2,
      type: 'user',
      isActive: true,
      createdAt: new Date("2021-09-25T20:00:00.000Z"),
      updatedAt: new Date("2021-09-25T20:00:00.000Z"),
      __v: 0,
      versionNumber: 1
    }],
    previousVersion: null,
    _id: "1",
  }
];

export const mockChats: Chat[] = [ // metadata of all chats of the user
  {
    _id: "64f9ebc42d44c40b86f57",
    title: "Math Demo",
    messages: messages1,
    docOrCollectionId: "123",
    modelUsed: "GPT-4",
    createdAt: new Date("2021-09-25T20:00:00.000Z"),
    updatedAt: new Date("2021-09-25T20:00:00.000Z"),
    __v: 0
  }, {
    _id: "64f9ebc42d44c40b86f60",
    title: "Markdown Demo",
    messages: messages2,
    docOrCollectionId: "123",
    modelUsed: "GPT-4",
    createdAt: new Date("2021-09-25T20:00:00.000Z"),
    updatedAt: new Date("2021-09-25T20:00:00.000Z"),
    __v: 0
  },
];