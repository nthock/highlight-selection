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

const generateSearchData = (state) => {
  const { searchInput } = state;

  if (searchInput.length > 2) {
    const searchData = generateRenderedContentCount(state);
    return {
      ...state,
      ...searchData,
    };
  }

  return { ...state, searchCount: 0, renderedContent: state.textContent };
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
