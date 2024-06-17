import React, { createRef, useState } from "react";
import { Point, CurvedArrow } from "./CurvedArrow";

class PromptOnTop extends React.Component<{
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
        <div className="text-white text-3xl sm:text-sm px-3 font-bold bg-black placeholder-gray-800 focus:outline-none focus:border-blue-500 rounded-lg my-2">
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

interface IBlockProps {
  text: string;
  onUpdatePoints: (
    inputs: { blockId: string; updatedPoint: Point }[],
    outputs: { blockId: string; updatedPoint: Point }[]
  ) => void;
  indent: number;
  inputNumber: number;
  outputNumber: number;
  blockId: string;
}

class Block extends React.Component<IBlockProps> {
  public inputs: Point[] = [];
  public outputs: Point[] = [];
  private inputDotRefs: React.RefObject<HTMLSpanElement>[];
  private outputDotRefs: React.RefObject<HTMLSpanElement>[];

  constructor(props) {
    super(props);
    if (this.props.inputNumber === 1) {
      this.inputs = [new Point(-5, -20)];
    } else if (this.props.inputNumber === 2) {
      this.inputs = [new Point(-5, -15), new Point(-5, -25)];
    } else if (this.props.inputNumber === 3) {
      this.inputs = [
        new Point(-5, -10),
        new Point(-5, -20),
        new Point(-5, -30),
      ];
    }
    if (this.props.outputNumber === 1) {
      this.outputs = [new Point(18, -5)];
    } else if (this.props.outputNumber === 2) {
      this.outputs = [new Point(18, -5), new Point(30, -5)];
    } else if (this.props.outputNumber === 3) {
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
      default: return "h-auto flex flex-row ml-[" + Number(20 + 4*(indent-4)).toString + "rem]";
    }
  };

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
        blockId: `${this.props.blockId}.${index + 1}`,
        updatedPoint: point,
      })),
      newOutputs.map((point, index) => ({
        blockId: `${this.props.blockId}.${index + 1}`,
        updatedPoint: point,
      }))
    );
  };

  render() {
    return (
      <div className={this.getIntendStyle(this.props.indent)}>
        <div
          className={
            "border-2 rounded-xl m-2 inline-block align-middle w-1/3 sm:w-full relative overflow-visible "
          }
        >
          <div className="text-white text-2xl sm:text-sm px-3 font-bold bg-black placeholder-gray-800 focus:outline-none focus:border-blue-500 rounded-lg my-3">
            {this.props.text}
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

type InputOutputType = {
  number: number;
  type: string;
  typeName: string;
  name: string;
};

type Node = {
  id: string;
  color: string;
  name: string;
  inputs: InputOutputType[];
  outputs: InputOutputType[];
  level: number;
};

export type Graph = {
  prompt: string;
  nodes: Node[];
  edges: {
    from: string;
    to: string;
  }[];
};

interface IGraphView {
  graph: Graph;
  promptOutputCoordinate: Point;
}

export const GraphView = ({ graph }) => {
  const [promptOutputCoordinate, setPromptOutputCoordinate] = useState<Point>(
    new Point(0, 0)
  );
  const [inputCoordsMap, setInputCoordsMap] = useState<Map<string, Point>>(
    new Map()
  );
  const [outputCoordsMap, setOutputCoordsMap] = useState<Map<string, Point>>(
    new Map()
  );
  // (BlockId -> Point)
  // Update the coordsMap on every block update

  const getOutputCoord = (blockId: string): Point => {
    if (blockId === "0") return promptOutputCoordinate;
    else {
      const got = outputCoordsMap.get(blockId);
      if (got) return got;
      else return new Point(0, 0);
    }
  };

  const getInputCoord = (blockId: string): Point => {
    const got = inputCoordsMap.get(blockId);
    if (got) return got;
    else return new Point(0, 0);
  };

  if (graph)
    return (
      <>
        <div className="h-auto flex flex-row">
          <PromptOnTop
            prompt={
              "Prompt Reprehenderit in laboris deserunt est sit pariatur aliqua nisi laborum ut voluptate fugiat."
            }
            onUpdatePoint={(output) => {
              setPromptOutputCoordinate(output);
            }}
          />
        </div>
        {graph.nodes.map((node, index) => {
          return (
            <Block
              text={node.name}
              onUpdatePoints={(inputs, outputs) => {
                setInputCoordsMap((prevMap) => {
                  const newMap = new Map(prevMap);
                  inputs.forEach((input) => {
                    newMap.set(input.blockId, input.updatedPoint);
                  });
                  return newMap;
                });
                setOutputCoordsMap((prevMap) => {
                  const newMap = new Map(prevMap);
                  outputs.forEach((output) => {
                    newMap.set(output.blockId, output.updatedPoint);
                  });
                  return newMap;
                });
              }}
              indent={node.level}
              blockId={node.id}
              inputNumber={node.inputs.length}
              outputNumber={node.outputs.length}
            />
          );
        })}
        {graph.edges.map((edge, index) => {
          return (
            <CurvedArrow
              key={index}
              from={getOutputCoord(edge.from)}
              to={getInputCoord(edge.to)}
            />
          );
        })}
      </>
    );
  else return <></>;
};
