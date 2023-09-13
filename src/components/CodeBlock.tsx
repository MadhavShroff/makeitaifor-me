import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CodeBlock = ({ value }) => (
  <SyntaxHighlighter language={null} style={docco}>
    {value}
  </SyntaxHighlighter>
);

export default CodeBlock;
