import { useReducer, useState, useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";

import Render from "./Render";

const updateContent = (text) => {
  console.log("text", text);
  return text
    .replace("\n\n", "\n")
    .split("\n")
    .map((t) => {
      if (t === "") {
        return { type: "lineBreak" };
      }
      return { type: "paragraph", text: t };
    });
};

const editorReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CONTENT":
      return {
        ...state,
        text: action.payload.text,
        content: updateContent(action.payload.text),
      };
    default:
      console.log("invalid action", action);
  }
};

const Editor = () => {
  const [state, dispatch] = useReducer(editorReducer, {
    content: [],
    text: "",
  });
  const [readOnly, setReadOnly] = useState(false);
  const editor = useRef(null);

  const onBlur = (e) => {
    dispatch({ type: "UPDATE_CONTENT", payload: { text: e.target.innerText } });
    setReadOnly(true);
    editor.current.innerText = "";
  };

  const onClick = () => {
    setReadOnly(false);
    editor.current.innerText = state.text;
  };

  console.log("text", state.text);

  return (
    <>
      <div className={`text-lg ${!readOnly && "hidden"}`} onClick={onClick}>
        <Render content={state.content} />
      </div>
      <div
        ref={editor}
        className={`outline-none text-lg text-blue-500 ${readOnly && "hidden"}`}
        contentEditable
        data-placeholder="Start typing here ..."
        onBlur={onBlur}
        onClick={onClick}
        suppressContentEditableWarning
      />
    </>
  );
};

export default Editor;
