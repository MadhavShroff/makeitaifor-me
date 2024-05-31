import { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "1", value: 300 },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 300, y: 300 },
    data: { label: "2", value: 0 },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 500, y: 100 },
    data: { label: "3", value: 100 },
    type: "custom",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", markerEnd: { type: "arrowclosed" } },
  { id: "e3-2", source: "3", target: "2", markerEnd: { type: "arrowclosed" } },
];

const nodeTypes = {
  custom: CustomNode,
};

export default function Playground() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        markerEnd: { type: "arrowclosed" },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#000",
    color: "white",
    border: "2px solid white",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.1s ease, transform 0.1s ease",
    textTransform: "capitalize",
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#323232";
    e.target.style.transform = "scale(1.04)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#000";
    e.target.style.transform = "scale(1)";
  };

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: `${nodes.length + 1}`,
        value: Math.floor(Math.random() * 100),
      },
      type: "custom",
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const updateNodeData = (nodeId) => {
    const parentEdges = edges.filter((edge) => edge.target === nodeId);
    const parentNodes = parentEdges.map((edge) =>
      nodes.find((node) => node.id === edge.source)
    );
    const newValue = parentNodes.reduce(
      (sum, node) => sum + node.data.value,
      0
    );

    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, value: newValue } }
          : node
      )
    );
  };

  const clearNodesAndEdges = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "10px",
          display: "flex",
          gap: "10px",
          backgroundColor: "#ff9800",
        }}
      >
        <button
          onClick={addNode}
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          ADD NODE
        </button>
        <button
          onClick={clearNodesAndEdges}
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          CLEAR
        </button>
        <button
          onClick={() => updateNodeData("2")}
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          UPDATE NODE 2
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          style={{ backgroundColor: "#000" }}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={30} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
