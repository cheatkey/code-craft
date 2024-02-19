import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

const CodeEditor = ({ code, setCode }: CodeEditorProps) => {
  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
      style={{
        fontSize: 12,
      }}
      placeholder={`console.log("Hello world!")`}
    />
  );
};

export default CodeEditor;
