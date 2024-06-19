import React, { createRef } from "react";
import { Point } from "./CurvedArrow";
import { Node } from "./GraphView";

interface IBlockProps {
  node: Node;
  onUpdatePoints: (
    inputs: { blockId: string; updatedPoint: Point }[],
    outputs: { blockId: string; updatedPoint: Point }[]
  ) => void;
}

export default class Block extends React.Component<IBlockProps> {
  public inputs: Point[] = [];
  public outputs: Point[] = [];
  private inputDotRefs: React.RefObject<HTMLSpanElement>[];
  private outputDotRefs: React.RefObject<HTMLSpanElement>[];

  constructor(props) {
    super(props);
    if (this.props.node.inputs.length === 1) {
      this.inputs = [new Point(-5, -20)];
    } else if (this.props.node.inputs.length === 2) {
      this.inputs = [new Point(-5, -15), new Point(-5, -25)];
    } else if (this.props.node.inputs.length === 3) {
      this.inputs = [
        new Point(-5, -10),
        new Point(-5, -20),
        new Point(-5, -30),
      ];
    }
    if (this.props.node.outputs.length === 1) {
      this.outputs = [new Point(18, -5)];
    } else if (this.props.node.outputs.length === 2) {
      this.outputs = [new Point(18, -5), new Point(30, -5)];
    } else if (this.props.node.outputs.length === 3) {
      this.outputs = [new Point(18, -5), new Point(30, -5), new Point(42, -5)];
    }
    this.inputDotRefs = this.inputs.map(() => createRef());
    this.outputDotRefs = this.outputs.map(() => createRef());
  }

  getIntendStyle = (indent: number) => {
    switch (indent) {
      case 0: return "h-auto flex flex-row ml-[3rem]";
      case 1: return "h-auto flex flex-row ml-[8rem]";
      case 2: return "h-auto flex flex-row ml-[12rem]";
      case 3: return "h-auto flex flex-row ml-[16rem]";
      case 4: return "h-auto flex flex-row ml-[20rem]";
      default: return "h-auto flex flex-row ml-[" + Number(20 + 4 * (indent - 4)).toString + "rem]";
    }
  };

  getNodeBg = (color: string) => {
    switch (color) {
      case "#86efac": return "bg-[#86efac] border-[#86efac] ";
      case "#bef264": return "bg-[#bef264] border-[#bef264] ";
      case "#fde047": return "bg-[#fde047] border-[#fde047] ";
      case "#fdba74": return "bg-[#fdba74] border-[#fdba74] ";
      default: return "bg-[#000000] border-[#000000] ";
    }
  }

  componentDidMount() {
    this.updatePositions();
    window.addEventListener("resize", this.updatePositions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePositions);
  }

  updatePositions = () => {
    const newInputs = this.inputDotRefs.map((ref, index) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect)
        return new Point(rect.x + rect.width / 2, rect.y + rect.height / 2);
      else return new Point(0, 0);
    });
    const newOutputs = this.outputDotRefs.map((ref, index) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect)
        return new Point(rect.x + rect.width / 2, rect.y + rect.height / 2);
      else return new Point(0, 0);
    });
    this.props.onUpdatePoints(
      newInputs.map((point, index) => ({
        blockId: `${this.props.node.id}.${index + 1}`,
        updatedPoint: point,
      })),
      newOutputs.map((point, index) => ({
        blockId: `${this.props.node.id}.${index + 1}`,
        updatedPoint: point,
      }))
    );
  };

  render() {
    return (
      <div className={this.getIntendStyle(this.props.node.level)}>
        <div
          className={
            this.getNodeBg(this.props.node.color)
            + "bg-opacity-25 border-2 rounded-xl m-2 inline-block align-middle w-1/3 sm:w-full relative overflow-visible "
          }
        >
          <div className={this.getNodeBg(this.props.node.color) + "bg-opacity-0 text-white text-2xl sm:text-sm px-3 font-bold placeholder-gray-800 focus:outline-none focus:border-blue-500 rounded-lg my-3"}>
            {this.props.node.name}
          </div>
          {/* Output dots rendering */}
          <div className="absolute bottom-0 w-full flex justify-between px-1">
            {this.outputs.map((dot, index) => (
              <span
                ref={this.outputDotRefs[index]}
                key={index}
                className="bg-white rounded-full w-2 h-2"
                style={{
                  position: "absolute",
                  left: `${dot.x}px`,
                  bottom: `${dot.y}px`,
                }}
              ></span>
            ))}
          </div>
          {/* Input dots rendering */}
          <div className="absolute left-0 w-full flex justify-between px-1">
            {this.inputs.map((dot, index) => (
              <span
                ref={this.inputDotRefs[index]}
                key={index}
                className="bg-white rounded-full w-2 h-2"
                style={{
                  position: "absolute",
                  left: `${dot.x}px`,
                  top: `${dot.y}px`,
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}