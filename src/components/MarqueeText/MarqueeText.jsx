// create new react component

import React from "react";
import { useEffect, useRef } from "react";
import SpanText from "./SpanText";

// type TestComponentProps = {
// text: string
// }

const MarqueeText = ({ text }) => {
  const ref = useRef(null);
  const strokeOffsetRef = useRef(null);

  useEffect(() => {

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (ref.current) {
        ref.current.style.transform = `translateX(${scrollY * 0.5 - 1000}px)`;
      }

      if (strokeOffsetRef.current) {
        strokeOffsetRef.current.style.strokeDashoffset = 4389.86 - scrollY * 2.4 + 1000;
      }
    };

    strokeOffsetRef.current.style.strokeDashoffset = 4389.86 - window.scrollY * 2.2;
    window.addEventListener("scroll", handleScroll);

    // Clean up function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section style={{
        inlineSize: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
      }}>
      <div style={{
          position: "relative",
          right: "0px",
          top: "0px",
        }}>
         <div
          ref={ref}
          style={{
            columnGap: "80px",
            display: "flex",
            WebkitFontSmoothing: "antialiased",
          }}>
          {" "}
          {[...Array(10)].map((_, i) => (
            <SpanText text={text} key={i} />
          ))}
          {" "}
        </div>
        <div>
          {" "}
          <svg
            style={{
              width: "100vw",
              fontSize: "1200px",
              left: "0px",
              right: "0px",
              overflowX: "hidden",
              overflowY: "hidden",
              pointerEvents: "none",
              position: "absolute",
              top: "25%",
              WebkitFontSmoothing: "antialiased",
              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
            }}
            width={"1em"}
            height={".186em"}
            viewBox={"0 0 2560 477"}
            fill={"none"}
            xmlns={"http://www.w3.org/2000/svg"}
            role={"presentation"}
            className={"MovingLine_MovingLine__line__IGVHc"}
          >
            {" "}
            <path
              ref={strokeOffsetRef}
              style={{
                fill: "none",
                fontSize: "1200px",
                marginLeft: 0,
                marginRight: 0,
                pointerEvents: "none",
                stroke: "url(#moving-line_svg__a)",
                strokeDasharray: "4389.86px",
                strokeDashoffset: "1527.89",
                strokeWidth: "0.4%",
                transitionDuration: "0.1s",
                transitionProperty: "stroke-dashoffset",
                WebkitFontSmoothing: "antialiased",
                WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
              }}
              d={
                "m-565.5 236.5 1022-154.034C2967.5-286-591.5 764.5 2104 393.966L2846 296"
              }
              stroke={"url(#moving-line_svg__a)"}
              strokeWidth={4}
              strokeDasharray={4389.86}
              strokeDashoffset={4389.86}
            ></path>{" "}
            <defs
              style={{
                boxSizing: "border-box",
                fill: "none",
                fontSize: "1200px",
                marginLeft: 0,
                marginRight: 0,
                pointerEvents: "none",
                WebkitFontSmoothing: "antialiased",
                WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
              }}
            >
              {" "}
              <lineargradient
                style={{
                  boxSizing: "border-box",
                  fill: "none",
                  fontSize: "1200px",
                  marginLeft: 0,
                  marginRight: 0,
                  pointerEvents: "none",
                  WebkitFontSmoothing: "antialiased",
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                }}
                id={"moving-line_svg__a"}
                x1={"1964.1"}
                y1={"211.885"}
                x2={"518.52"}
                y2={"211.885"}
                gradientUnits={"userSpaceOnUse"}
              >
                {" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(255, 128, 69)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={"0.14"}
                  stopColor={"#FF8045"}
                ></stop>{" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(245, 144, 94)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={"0.16"}
                  stopColor={"#F5905E"}
                ></stop>{" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(229, 171, 135)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={"0.22"}
                  stopColor={"#E5AB87"}
                ></stop>{" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(215, 193, 170)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={"0.27"}
                  stopColor={"#D7C1AA"}
                ></stop>{" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(204, 210, 196)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={"0.33"}
                  stopColor={"#CCD2C4"}
                ></stop>{" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(197, 222, 215)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={"0.39"}
                  stopColor={"#C5DED7"}
                ></stop>{" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(192, 230, 226)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={"0.45"}
                  stopColor={"#C0E6E2"}
                ></stop>{" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(191, 232, 230)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={"0.51"}
                  stopColor={"#BFE8E6"}
                ></stop>{" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(205, 196, 245)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={"0.76"}
                  stopColor={"#CDC4F5"}
                ></stop>{" "}
                <stop
                  style={{
                    boxSizing: "border-box",
                    fill: "none",
                    fontSize: "1200px",
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: "none",
                    stopColor: "rgb(255, 189, 69)",
                    WebkitFontSmoothing: "antialiased",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  }}
                  offset={1}
                  stopColor={"#FFBD45"}
                ></stop>{" "}
              </lineargradient>{" "}
            </defs>{" "}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default MarqueeText;
