const updateTextContent = (textContent, { id, updatedText }) => {
  return textContent.map((content) => {
    if (content.id === id) {
      const cleanText = updatedText.replace(/(<([^>]+)>)/gi, "");
      return { ...content, text: cleanText };
    }
    return content;
  });
};

const generateUpdatedText = (
  content,
  searchCount,
  occurences,
  currentSelection,
  regExp
) => {
  if (currentSelection <= searchCount) {
    return content.text.replace(
      regExp,
      (match) => `<mark class="selected">${match}</mark>`
    );
  }

  if (currentSelection > searchCount + occurences.length) {
    return content.text.replace(
      regExp,
      (match) => `<mark class="selected">${match}</mark>`
    );
  }

  const selectedIndex = currentSelection - searchCount - 1;

  return content.text.replace(regExp, (match, index) => {
    if (index === occurences[selectedIndex].index) {
      return `<mark id="active-selection" class="active">${match}</mark>`;
    }
    return `<mark class="selected">${match}</mark>`;
  });
};

const generateRenderedContentCount = ({
  searchInput,
  textContent,
  currentSelection,
}) => {
  const regExp = new RegExp(searchInput, "gi");

  return textContent.reduce(
    (acc, content) => {
      const occurences = [...content.text.matchAll(regExp)];
      const updatedText = generateUpdatedText(
        content,
        acc.searchCount,
        occurences,
        currentSelection,
        regExp
      );

      return {
        ...acc,
        searchCount: (acc.searchCount += occurences.length),
        renderedContent: [
          ...acc.renderedContent,
          { ...content, text: updatedText },
        ],
      };
    },
    { searchCount: 0, renderedContent: [] }
  );
};

const updateSelection = (currentSelection, searchCount) => {
  if (searchCount === 0) {
    return 0
  }

  if (searchCount > 0) {
    if (currentSelection === 0) {
      return 1
    }
    if (currentSelection <= searchCount) {
      return currentSelection
    }
    return searchCount
  }

  return currentSelection
}

const generateSearchData = (state) => {
  const { searchInput, currentSelection, textContent } = state;

  if (searchInput.length > 2) {
    const searchCount = textContent.map(c => c.text).join(" ").match(new RegExp(searchInput, "gi"))?.length || 0
    const updatedCurrentSelection = updateSelection(currentSelection, searchCount)
    const searchData = generateRenderedContentCount({ ...state, currentSelection: updatedCurrentSelection });
    return {
      ...state,
      ...searchData,
      currentSelection: updatedCurrentSelection
    };
  }

  return { ...state, searchCount: 0, renderedContent: state.textContent, currentSelection: 0 };
};

const setPreviousSelection = ({ currentSelection }) => {
  if (currentSelection === 1) {
    return currentSelection;
  }
  return currentSelection - 1;
};

const setNextSelection = ({ currentSelection, searchCount }) => {
  if (currentSelection >= searchCount) {
    return currentSelection;
  }
  return currentSelection + 1;
};

export const contentReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_TERM":
      return generateSearchData({ ...state, searchInput: action.payload.text });
    case "UPDATE_CONTENT":
      return generateSearchData({
        ...state,
        textContent: updateTextContent(state.textContent, action.payload),
      });
    case "PREVIOUS_SELECTION":
      return generateSearchData({
        ...state,
        currentSelection: setPreviousSelection(state),
      });
    case "NEXT_SELECTION":
      return generateSearchData({
        ...state,
        currentSelection: setNextSelection(state),
      });
    default:
      console.log("action", action);
      throw new Error();
  }
};
