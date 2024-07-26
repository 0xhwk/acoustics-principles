import { absorbtionTable } from "./tables/absorbtionTable";

export const AbsorbtionDropdown = ({
  topPointMatrix,
  wallMaterial,
  setWallMaterial,
  floorMaterial,
  setFloorMaterial,
  ceilingMaterial,
  setCeilingMaterial,
}) => {
  const { materials } = absorbtionTable;

  const handleChange = (index) => (event) => {
    const selectedMaterial = event.target.value;
    const newAbsorbtionCoef = [...wallMaterial];
    newAbsorbtionCoef[index] = selectedMaterial;
    setWallMaterial(newAbsorbtionCoef);
  };

  const getNextIndex = (i) => {
    return (i + 1) % topPointMatrix.length;
  };

  const renderDropdowns = () => {
    return topPointMatrix.map((_, index) => {
      const nextIndex = getNextIndex(index);

      return (
        <div key={index} className="flex flex-col mb-4 px-2 gap-2">
          <h1 className="w-full text-center">{`Line ${index}-${nextIndex}`}</h1>
          <div className="relative">
            <select
              className="secondary-box block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border focus:border-primary"
              onChange={handleChange(index)}
              value={wallMaterial[index] || ""}
            >
              <option value="" disabled>
                Select a material
              </option>
              {Object.keys(materials).map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
            <div className="absolute right-[5%] top-[27%] "> {`v`}</div>
          </div>
        </div>
      );
    });
  };

  const renderCeilAndFloorDropdown = () => {
    return (
      <>
        <div className="flex flex-col mb-4 px-2 gap-2">
          <h1 className="w-full text-center">{`Ceiling`}</h1>
          <div className="relative">
            <select
              className="secondary-box block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border focus:border-primary"
              onChange={(e) => setCeilingMaterial(e.target.value)}
              value={ceilingMaterial}
            >
              <option value="select" disabled>
                Select a material
              </option>
              {Object.keys(materials).map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
            <div className="absolute right-[5%] top-[27%] "> {`v`}</div>
          </div>
        </div>
        <div className="flex flex-col mb-4 px-2 gap-2">
          <h1 className="w-full text-center">{`Floor`}</h1>
          <div className="relative">
            <select
              className="secondary-box block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border focus:border-primary"
              onChange={(e) => setFloorMaterial(e.target.value)}
              value={floorMaterial}
            >
              <option value="select" disabled>
                Select a material
              </option>
              {Object.keys(materials).map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
            <div className="absolute right-[5%] top-[27%] "> {`v`}</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex pt-4 min-h-[90px]">
      {renderCeilAndFloorDropdown()}
      {renderDropdowns()}
    </div>
  );
};
