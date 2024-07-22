export const PointInput = ({ topPointMatrix, setTopPointMatrix }) => {
  const renderCurrentPoints = () => {
    return topPointMatrix.map((point, i) => {
      return (
        <div className="flex flex-col gap-3 p-2">
          <h1>{`Point ${i}`}</h1>
          <div className="flex gap-3 justify-center items-center text-xl">
            x
            <input type="number" className="input text-sm" />
            y
            <input type="number" className="input text-sm" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="secondary-box h-full w-full p-4">
      <div className="flex flex-col gap-3 p-2">
        <h1>Ceiling Height</h1>
        <input type="number" className="input text-sm" />
      </div>
      {renderCurrentPoints()}
    </div>
  );
};
