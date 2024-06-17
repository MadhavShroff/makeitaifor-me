import React, { useState, useRef, useEffect, createRef } from "react";

export class Point {
  x: number; y: number;
  constructor(x: number, y: number) {
    this.x = x; this.y = y;
  }
}

interface IArrowHeadProps {
  to: Point;
};

interface ILine extends IArrowHeadProps {
  from: Point;
}

interface ICurvedLine extends ILine {
  radius: number;
}

const ArrowHead: React.FC<IArrowHeadProps> = ({ to }) => {
  const headLength = 10; // The length of the sides of the arrowhead triangle
  const headWidth = 5;  // Half the base width of the triangle
  const points = [
    `${to.x}, ${to.y}`, // Tip of the arrowhead
    `${to.x - headLength}, ${to.y - headWidth}`, // Bottom left of the triangle
    `${to.x - headLength}, ${to.y + headWidth}` // Bottom right of the triangle 
  ].join(' ');
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} className="z-10">
      <polygon points={points} fill="white" />
    </svg>
  );
};

const StraightLine: React.FC<ILine> = ({ from, to }) => {
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} className="z-10">
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="white" strokeWidth="2" />
    </svg>
  );
}

const CurvedLine: React.FC<ICurvedLine> = ({ from, to, radius }) => {
  // Defines the path using an SVG arc
  // The arc spans from`from` point to `to` points, forming a 90 degree curve.
  // The large-arc-flag is set to 0 and the sweep-flag is set to 0 to ensure the arc curves 90 degrees in a "negative" direction.
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} className="z-10">
      <path d={`M ${from.x} ${from.y} A ${radius} ${radius} 0 0 0 ${to.x} ${to.y}`} fill="none" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export const CurvedArrow: React.FC<ILine> = ({ from, to }) => {
  const [radius, setRadius] = useState(50);
  useEffect(() => {
    const isValid = point => point && point.x && point.y && point.x !== 0 && point.y !== 0;
    if (isValid(from) && isValid(to)) {
      setRadius(Math.abs(from.x - to.x) / 2);
    }
  }, [from, to]); // Early return for invalid or zero coordinates
  if (!from || !to || from.x === 0 || from.y === 0 || to.x === 0 || to.y === 0) return null;
  return (
    <>
      <StraightLine from={{ ...from }} to={{ x: from.x, y: to.y - radius }} />
      <CurvedLine 
        from={{ x: from.x, y: to.y - radius - 0.25 }} 
        to={{ x: from.x + radius, y: to.y }} 
        radius={radius} />
      <StraightLine from={{ x: from.x + radius - 0.25, y: to.y }} to={{ ...to }} />
      <ArrowHead to={{ ...to }} />
    </>
  )
}

export default CurvedArrow;