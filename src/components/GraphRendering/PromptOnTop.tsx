import React from "react";
import { createRef } from "react";
import { Point } from "./CurvedArrow";

export class PromptOnTop extends React.Component<{
    prompt: string;
    onUpdatePoint: (outputs: Point) => void;
  }> {
    public output: Point;
    private outputDotRef: React.RefObject<HTMLSpanElement>;
  
    constructor(props) {
      super(props);
      (this.output = new Point(3, -5)), (this.outputDotRef = createRef());
    }
  
    componentDidMount() {
      this.updatePositions();
      window.addEventListener("resize", this.updatePositions);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.updatePositions);
    }
  
    updatePositions = () => {
      let newPoint;
      const rect = this.outputDotRef.current?.getBoundingClientRect();
      if (rect)
        newPoint = new Point(rect.x + rect.width / 2, rect.y + rect.height / 2);
      else throw new Error("Ref is not defined");
      this.props.onUpdatePoint(newPoint);
    };
  
    render() {
      return (
        <div className="border-2 rounded-xl m-2 inline-block align-middle w-1/2 sm:w-full relative overflow-visible">
          <div className="text-white text-3xl sm:text-2xl px-3 font-bold bg-black placeholder-gray-800 focus:outline-none focus:border-blue-500 rounded-lg my-2">
            {this.props.prompt}
          </div>
          {/* Dots rendering */}
          <div className="absolute bottom-0 w-full flex justify-between px-1">
            <span
              ref={this.outputDotRef}
              key={1}
              className="bg-white rounded-full w-2 h-2"
              style={{
                position: "absolute",
                left: `${this.output.x}%`,
                bottom: `${this.output.y}px`,
              }}
            ></span>
          </div>
        </div>
      );
    }
  }