import { useRef } from "react";
import "prosemirror-view/style/prosemirror.css";

import { schema } from "prosemirror-schema-basic";
import { useProseMirror, ProseMirror } from "use-prosemirror";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { Plugin } from "prosemirror-state";
import { baseKeymap, Command, toggleMark } from "prosemirror-commands";

import SelectionSizeTooltip from "./sectionSizeTooltip";

const toggleMarkCommand = (mark) => {
  return (state, dispatch) => toggleMark(mark)(state, dispatch);
};

const toggleBold = toggleMarkCommand(schema.marks.strong);
const toggleItalic = toggleMarkCommand(schema.marks.em);
const readID = (dom) => ({ id: dom.getAttribute("id") });

const generateOpts = (view) => {
  const selectionSizePlugin = new Plugin({
    view(editorView) {
      return new SelectionSizeTooltip(editorView);
    },
  });

  return {
    schema,
    plugins: [
      history(),
      keymap({
        ...baseKeymap,
        "Mod-z": undo,
        "Mod-y": redo,
        "Mod-Shift-z": redo,
        "Mod-b": toggleBold,
        "Mod-i": toggleItalic,
      }),
      selectionSizePlugin,
    ],
  };
};

const Prose = () => {
  const viewRef = useRef();
  const opts = generateOpts(viewRef.current);
  const [state, setState] = useProseMirror(opts);
  console.log("state", state);
  return (
    <div className="border border-gray-200 rounded">
      <ProseMirror
        ref={viewRef}
        className="p-4"
        state={state}
        onChange={setState}
      />
    </div>
  );
};

export default Prose;
