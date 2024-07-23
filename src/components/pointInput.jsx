import { absorbtionTable } from "./tables/absorbtionTable";

export const PointInput = ({
  topPointMatrix,
  setTopPointMatrix,
  changePointCoordinates,
  boundaryCoordX,
  boundaryCoordY,
  ceilingHeight,
  setCeilingHeight,
  setAbsorbtionCoef,
  absorbtionCoef,
}) => {
  const validatePoint = (point) => {
    // Helper function to clean and convert a coordinate
    const cleanAndConvert = (coord) => {
      if (typeof coord === "string") {
        // Remove non-numeric characters except for leading '-'
        coord = coord.replace(/[^0-9-]/g, "");
        // Remove leading zeros (but keep '-' if it exists)
        coord = coord.replace(/^-?0+/, "") || "0"; // '0' if string becomes empty
      }
      // Convert to number
      return Number(coord);
    };

    // Clean and convert both coordinates
    let x = cleanAndConvert(point[0]);
    let y = cleanAndConvert(point[1]);

    // Adjust boundaries for x coordinate
    if (x < -boundaryCoordX) x = -boundaryCoordX;
    else if (x > boundaryCoordX) x = boundaryCoordX;

    // Adjust boundaries for y coordinate
    if (y < -boundaryCoordY) y = -boundaryCoordY;
    else if (y > boundaryCoordY) y = boundaryCoordY;

    // Return the cleaned and validated point
    return [x, y];
  };

  const validateCeil = (value) => {
    let inputValue = value;
    inputValue = inputValue.replace(/[^0-9.]/g, "");
    inputValue = inputValue.replace(/^0+(?=\d)/, "");
    inputValue = inputValue.replace(/(\..*)\./g, "$1");
    if (inputValue === ".") {
      inputValue = "";
    }

    return inputValue;
  };

  const renderCurrentPoints = () => {
    return topPointMatrix.map((point, i) => {
      return (
        <div key={i} className="flex flex-col gap-3 p-2">
          <h1 className="border-b border-content4 pb-2">{`Point ${i}`}</h1>
          <div className="flex gap-3 justify-center items-center text-xl">
            x:
            <input
              onChange={(e) => {
                changePointCoordinates(
                  validatePoint([e.target.value, point[1]]),
                  i
                );
              }}
              value={point[0]}
              className="input text-sm"
            />
            y:
            <input
              value={point[1]}
              onChange={(e) => {
                changePointCoordinates([point[0], e.target.value], i);
              }}
              className="input text-sm"
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="secondary-box h-full w-full p-4">
      <div className="flex flex-col gap-3 p-2">
        <h1>Ceiling Height</h1>
        <input
          value={ceilingHeight}
          onChange={(e) => {
            setCeilingHeight(validateCeil(e.target.value));
          }}
          className="input text-sm"
        />
      </div>
      <div className="flex">
        <div className="flex flex-col w-full">{renderCurrentPoints()}</div>
      </div>
    </div>
  );
};
