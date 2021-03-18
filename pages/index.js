import { useEffect, useState } from "react"
import { Input } from "antd"
import { CloseOutlined, SearchOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

const contentList = [
  { id: 1, text: "hello world" },
  { id: 2, text: "another hello" }
]

const highlightText = (searchTerm, contentList) => {
  if (searchTerm.length > 2) {
    const updatedContentList = contentList.map(content => {
      const updatedText = content.text.replace(new RegExp(searchTerm, "gi"), match => (
        `<mark>${match}</mark>`
      ))
      return {
        ...content,
        text: updatedText
      }
    })
    return updatedContentList
  }
  return contentList
}

const getSearchCount = (searchTerm, contentList) => {
  if (searchTerm.length < 2) {
    return 0
  }
  const regExp = new RegExp(searchTerm, "gi");

  const count = contentList.reduce((acc, content) => {
    return acc += (content.text.match(regExp) || []).length
  }, 0)
  console.log("count", count)
  return count
}

const Home = () => {
  const [searchInput, setSearchInput] = useState("")
  const [textContent, setTextContent] = useState(contentList)

  const onChange = (e) => {
    setSearchInput(e.target.value)
  }

  const onUpdateText = (id, updatedText) => {
    const updatedTextContent = textContent.map(content => {
      if (content.id === id) {
        const cleanText = updatedText.replace(/(<([^>]+)>)/ig, '')
        return { ...content, text: cleanText }
      }
      return content
    })
    setTextContent(updatedTextContent)
  }

  const renderedContent = highlightText(searchInput, textContent)
  const searchCount = getSearchCount(searchInput, textContent)

  return (
    <div>
      <div className="container mx-auto p-6">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <Input placeholder="search"
              value={searchInput}
              onChange={onChange}
              prefix={<SearchOutlined />}
              suffix={
                <>
                  <p>1/{searchCount}</p>
                  <UpOutlined className="mx-1" />
                  <DownOutlined className="mx-1" />
                  <CloseOutlined className="ml-2" onClick={() => setSearchInput("")} />
                </>
              }
            />
            <div className="mt-2">
              {
                renderedContent.map((content) => {
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
