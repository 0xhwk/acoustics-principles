export const Controls = ({
  scale,
  setScale,
  activeTab,
  setActiveTab,
  setTopPointMatrix,
  setFloorPoints,
  setCeilingPoints,
}) => {
  return (
    <div className="flex gap-2 w-full  h-min">
      <button
        onClick={() => setActiveTab("add")}
        className={`primary-button ${
          activeTab == "add" && "!border-green-500 border-[3px]"
        }`}
      >
        Add Points
      </button>
      <button
        onClick={() => setActiveTab("remove")}
        className={`primary-button ${
          activeTab == "remove" && "!border-green-500 border-[3px]"
        }`}
      >
        Remove Points
      </button>
      <button
        onClick={() => {
          setTopPointMatrix([]);
          setCeilingPoints([]);
          setFloorPoints([]);
        }}
        className="secondary-button"
      >
        Reset
      </button>
      <input
        type="number"
        value={scale}
        onChange={(e) => {
          let newScale = e.target.value;
          newScale = newScale ? newScale : 1;
          newScale = newScale <= 0 ? 1 : newScale;
          setScale(newScale);
        }}
        className="input !p-0 !px-2 !flex !justify-center !items-center"
      />
    </div>
  );
};
