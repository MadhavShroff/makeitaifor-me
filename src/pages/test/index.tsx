import React, { useState, useRef, useEffect, createRef } from "react";
import { Point, CurvedArrow } from "./CurvedArrow";
import { GraphView, Graph } from "./GraphView";
import { fetchTestGraph } from "@/utils/fetches";

const TestPage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [graph, setGraph] = useState<Graph>();

  useEffect(() => {
    fetchTestGraph(setGraph);
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
