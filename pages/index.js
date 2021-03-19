import { useEffect, useReducer } from "react";
import { Input } from "antd";
import {
  CloseOutlined,
  SearchOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { contentReducer } from "../reducers/contentReducer";

const contentList = [
  { id: 1, text: "hello world hello" },
  { id: 2, text: "2 another hello" },
  { id: 3, text: "3 another hello" },
  { id: 4, text: "4 another hello" },
  { id: 5, text: "5 another hello" },
  { id: 6, text: "6 another hello" },
  { id: 7, text: "7 another hello" },
  { id: 8, text: "8 another hello" },
  { id: 9, text: "9 another hello" },
  { id: 10, text: "10 another hello" },
  { id: 11, text: "11 another hello" },
  { id: 12, text: "12 another hello" },
  { id: 13, text: "13 another hello" },
  { id: 14, text: "14 another hello" },
  { id: 15, text: "15 another hello" },
  { id: 16, text: "16 another goodbye" },
  { id: 17, text: "17 another hello" },
  { id: 18, text: "18 another hello" },
  { id: 19, text: "19 another hello" },
  { id: 20, text: "20 another hello" },
  { id: 21, text: "21 another hello" },
  { id: 22, text: "22 another hello" },
  { id: 23, text: "23 another hello" },
  { id: 24, text: "24 another hello" },
  { id: 25, text: "25 another hello" },
  { id: 26, text: "26 finally goodbye" },
];

const Home = () => {
  const [state, dispatch] = useReducer(contentReducer, {
    textContent: contentList,
    searchCount: 0,
    renderedContent: contentList,
    currentSelection: 1,
    searchInput: "",
  });

  const onChange = (e) => {
    dispatch({ type: "UPDATE_SEARCH_TERM", payload: { text: e.target.value } });
  };

  const onUpdateText = (id, updatedText) => {
    dispatch({ type: "UPDATE_CONTENT", payload: { id, updatedText } });
  };

  useEffect(() => {
    if (document) {
      document.getElementById("active-selection")?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      });
    }
  })



  return (
    <div>
      <div className="container mx-auto p-6">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <Input
              placeholder="search"
              value={state.searchInput}
              onChange={onChange}
              prefix={<SearchOutlined />}
              suffix={
                <>
                  <p>
                    {state.currentSelection}/{state.searchCount}
                  </p>
                  <UpOutlined
                    className="mx-1"
                    onClick={() => dispatch({ type: "PREVIOUS_SELECTION" })}
                  />
                  <DownOutlined
                    className="mx-1"
                    onClick={() => dispatch({ type: "NEXT_SELECTION" })}
                  />
                  <CloseOutlined
                    className="ml-2"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_SEARCH_TERM",
                        payload: { text: "" },
                      })
                    }
                  />
                </>
              }
            />
            <div className="mt-2 h-60 overflow-scroll">
              {state.renderedContent.map((content) => {
                return (
                  <div className="my-4" key={`content-${content.id}`}>
                    <span
                      className="w-full outline-none"
                      contentEditable
                      dangerouslySetInnerHTML={{ __html: content.text }}
                      onBlur={(e) =>
                        onUpdateText(content.id, e.target.innerHTML)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
