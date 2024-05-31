/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Handle } from "reactflow";

function getRandomColour() {
  const nodeColours = [
    "#60A5FA",
    "#34D399",
    "#FBBF24",
    "#F87171",
    "#9CA3AF",
    "#A78BFA",
  ];
  const randomIndex = Math.floor(Math.random() * nodeColours.length);
  return nodeColours[randomIndex];
}

const CustomNode = ({ data, isConnectable }) => {
  const [clicked, setClicked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleClick = () => {
    setClicked(true);
  };

  const handleMouseLeave = () => {
    setClicked(false);
  };

  useEffect(() => {
    setBackgroundColor(getRandomColour());
  }, []);

  const nodeStyle = {
    padding: "8px 80px",
    border: "1px solid black",
    borderRadius: "5px",
    background: clicked ? backgroundColor : "white",
    transform: clicked ? "scale(1.2)" : "scale(1)",
    transition: "transform 0.2s ease",
    position: "relative",
  };

  return (
    <div
      style={nodeStyle}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
    >
      {!clicked && data.label}
      {clicked && (
        <div style={{ width: "80px", height: "100px" }}>
          value: {data.value}
        </div>
      )}
      <Handle
        type="target"
        position="top"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="bottom"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNode;
