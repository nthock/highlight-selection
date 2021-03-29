import Prose from "../components/prose/Prose";

const ProsePage = () => {
  return (
    <div>
      <div className="container mx-auto p-6">
        <p className="text-lg font-bold">Editor</p>
        <Prose />
      </div>
    </div>
  );
};

export default ProsePage;
