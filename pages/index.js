import { useReducer } from "react"
import { Input } from "antd"
import { CloseOutlined, SearchOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

import { contentReducer } from "../reducers/contentReducer"

const contentList = [
  { id: 1, text: "hello world hello" },
  { id: 2, text: "another hello" },
  { id: 3, text: "another hello" },
  { id: 4, text: "another hello" },
  { id: 5, text: "another hello" },
  { id: 6, text: "another hello" },
  { id: 7, text: "another hello" },
  { id: 8, text: "another hello" }
]

const Home = () => {
  const [state, dispatch] = useReducer(contentReducer, {
    textContent: contentList,
    searchCount: 0,
    renderedContent: contentList,
    currentSelection: 0,
    searchInput: ""
  });

  console.log("state", state)

  const onChange = (e) => {
    dispatch({ type: "UPDATE_SEARCH_TERM", payload: { text: e.target.value } })
  }

  const onUpdateText = (id, updatedText) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: { id, updatedText } })
  }

  return (
    <div>
      <div className="container mx-auto p-6">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <Input placeholder="search"
              value={state.searchInput}
              onChange={onChange}
              prefix={<SearchOutlined />}
              suffix={
                <>
                  <p>1/{state.searchCount}</p>
                  <UpOutlined className="mx-1" />
                  <DownOutlined className="mx-1" />
                  <CloseOutlined className="ml-2" onClick={() => dispatch({ type: "UPDATE_SEARCH_TERM", payload: { text: "" } })} />
                </>
              }
            />
            <div className="mt-2">
              {
                state.renderedContent.map((content) => {
                  return (
                    <div className="my-4" key={`content-${content.id}`}>
                      <span
                        className="w-full outline-none"
                        contentEditable dangerouslySetInnerHTML={{ __html: content.text }}
                        onBlur={(e) => onUpdateText(content.id, e.target.innerHTML)}

                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
