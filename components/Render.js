const Paragraph = ({ text, index }) => {
  return (
    <div id={`block-${index + 1}`}>
      <p>{text}</p>
    </div>
  );
};

const LineBreak = ({ index }) => (
  <div id={`block-${index + 1}`}>
    <br />
  </div>
);

const componentList = {
  paragraph: Paragraph,
  lineBreak: LineBreak,
};

const Render = ({ content }) => {
  return (
    <>
      {content.map((c, index) => {
        const Component = componentList[c.type];
        return <Component key={`block-${index}`} index={index} {...c} />;
      })}
    </>
  );
};

export default Render;
