import React, { useState, useRef, useEffect, createRef } from "react";
import { GraphView, Graph } from "../../components/GraphRendering/GraphView";
import { fetchTestGraph } from "@/utils/fetches";

const TestPage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [graph, setGraph] = useState<Graph>({
    "prompt": "Tell me about the Uffitzi Gallery",
    "nodes": [
      {
        "id": "1",
        "color": "#fdba74",
        "name": "Generate Search Queries",
        "level": 0,
        "inputs": [
          {
            "number": 1,
            "type": "string",
            "typeName": "Search query for which to generate related queries",
            "name": "Search Query"
          }
        ],
        "outputs": [
          {
            "number": 1,
            "type": "string",
            "typeName": "Search Query 1",
            "name": "Search Query 1"
          },
          {
            "number": 2,
            "type": "string",
            "typeName": "Search Query 2",
            "name": "Search Query 2"
          },
          {
            "number": 3,
            "type": "string",
            "typeName": "Search Query 3",
            "name": "Search Query 3"
          }
        ]
      },
      {
        "id": "2",
        "color": "#fde047",
        "name": "Perform Google Seach",
        "level": 1,
        "inputs": [
          {
            "number": 1,
            "type": "string[]",
            "typeName": "String of Search Queries",
            "name": "Search Query List"
          }
        ],
        "outputs": [
          {
            "number": 1,
            "type": "JSON<SearchResult>",
            "typeName": "Structured Object of Search Results",
            "name": "Search Result"
          }
        ]
      },
      {
        "id": "3",
        "color": "#bef264",
        "name": "Rephrase content",
        "level": 2,
        "inputs": [
          {
            "number": 1,
            "type": "JSON<SearchResult>",
            "typeName": "Structured Object of Search Results",
            "name": "Search Result"
          },
          {
            "number": 2,
            "type": "string[]",
            "typeName": "Additional Context",
            "name": "Additional Context"
          }
        ],
        "outputs": [
          {
            "number": 1,
            "type": "Markdown",
            "typeName": "Extracted Information",
            "name": "Extracted Information"
          }
        ]
      },
      {
        "id": "4",
        "color": "#86efac",
        "name": "Export to PDF",
        "level": 3,
        "inputs": [
          {
            "number": 1,
            "type": "Markdown",
            "typeName": "Extracted Information",
            "name": "Extracted Information"
          }
        ],
        "outputs": [
          {
            "number": 1,
            "type": "PDF URL",
            "typeName": "Downloadable PDF Link",
            "name": "Generated PDF"
          }
        ]
      }
    ],
    "edges": [
      { "from": "0", "to": "1.1" },
      { "from": "1.1", "to": "2.1" },
      { "from": "1.2", "to": "2.1" },
      { "from": "1.3", "to": "2.1" },
      { "from": "2.1", "to": "3.2" },
      { "from": "0", "to": "3.1" },
      { "from": "3.1", "to": "4.1" },
      { "from": "3.1", "to": "out" }
    ]
  });

  useEffect(() => {
    // fetchTestGraph(setGraph);
  });

  const handleButtonClick = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 300); // Reset the animation state after 300ms
    if (inputRef.current) {
      setPrompt(inputRef.current.value); // Get text from input via ref
    }
    inputRef.current!.value = ""; // Clear the input field
  };

  return (
    <>
      <div className="bg-black min-h-screen flex flex-col justify-end items-stretch p-2 gap-2">
        <div className="justify-start basis-11/12 border-4 rounded-xl">
          <GraphView graph={graph} />
        </div>
        <div className="flex flex-row basis-1/12 border-4 rounded-xl">
          <input
            ref={inputRef}
            className="flex-grow basis-1/12 text-white text-3xl px-3 font-bold bg-black placeholder-gray-800 focus:outline-none focus:border-blue-500 rounded-l-lg"
            placeholder="What do you wanna get done?"
          // Set a ref to the input element, so we can access its content
          />
          <button
            className={`ml-4 py-2 px-4 rounded-r-lg bg-orange-500 text-white hover:border-white ${buttonClicked ? "scale-90" : "scale-100"
              } transition duration-150 ease-in-out`}
            onClick={handleButtonClick}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default TestPage;
