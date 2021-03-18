const updateTextContent = (textContent, { id, updatedText }) => {
  return textContent.map(content => {
    if (content.id === id) {
      const cleanText = updatedText.replace(/(<([^>]+)>)/ig, '')
      return { ...content, text: cleanText }
    }
    return content
  })
}

const generateRenderedContentCount = ({ searchInput, textContent }) => {
  const regExp = new RegExp(searchInput, "gi");
  const currentSelection = 2

  return textContent.reduce((acc, content) => {
    const updatedText = content.text.replace(regExp, (match, index) => {
      console.log("content.text index", content.text, index)
      return `<mark class="selected">${match}</mark>`
    })
    console.log("searchCount", acc.searchCount)

    return {
      ...acc,
      searchCount: acc.searchCount += (content.text.match(regExp) || []).length,
      renderedContent: [...acc.renderedContent, { ...content, text: updatedText }]
    }
  }, { searchCount: 0, renderedContent: [] })
}

const generateSearchData = (state) => {
  const { searchInput } = state

  if (searchInput.length > 2) {
    const searchData = generateRenderedContentCount(state)
    return {
      ...state,
      ...searchData
    }
  }

  return { ...state, searchCount: 0, renderedContent: state.textContent }
}

export const contentReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
      return generateSearchData({ ...state, searchInput: action.payload.text })
    case 'UPDATE_CONTENT':
      return generateSearchData({ ...state, textContent: updateTextContent(state.textContent, action.payload) })
    default:
      console.log("action", action)
      throw new Error();
  }
}