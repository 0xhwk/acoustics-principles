export const Controls = ({ activeTab, setActiveTab, setTopPointMatrix }) => {
  return (
    <div className="flex gap-2 w-full ">
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
        }}
        className="secondary-button"
      >
        Reset
      </button>
    </div>
  );
};
