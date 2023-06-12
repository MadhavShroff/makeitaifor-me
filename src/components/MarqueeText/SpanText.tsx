type SpanTextProps = {
    text: string
}

const SpanText = (props: SpanTextProps) => {
    return (
        <span
            style={{
              fontFamily: "roobert, Arial, sans-serif",
              fontSize: "250px",
              fontWeight: 500,
              letterSpacing: "-7.8px",
              marginLeft: 0,
              marginRight: 0,
              minBlockSize: "auto",
              minHeight: "auto",
              minInlineSize: "auto",
              minWidth: "auto",
              WebkitFontSmoothing: "antialiased",
              WebkitTextFillColor: "rgba(0, 0, 0, 0)",
              WebkitTextStrokeColor: "rgb(157, 160, 177)",
              WebkitTextStrokeWidth: "3px",
            }}>
            {" "}
            {props.text}{" "}
          </span>
    )
}

export default SpanText;