import { useState, useEffect } from "react";
import { TopView } from "./components/topView";
import { Controls } from "./components/controls";
import { PointInput } from "./components/pointInput";
import { AbsorbtionDropdown } from "./components/absorbtionDropdown";
import { absorbtionTable } from "./components/tables/absorbtionTable";
function App() {
  const [topPointMatrix, setTopPointMatrix] = useState([]);
  const [ceilingHeight, setCeilingHeight] = useState(3);
  const [listenerPoint, setListenerPoint] = useState([5, 0]);
  const [sourcePoint, setSourcePoint] = useState([-5, 0]);
  const [activeTab, setActiveTab] = useState("add");
  const { materials } = absorbtionTable;

  const [absorbtionCoef, setAbsorbtionCoef] = useState(
    new Array(topPointMatrix.length).fill(Object.keys(materials)[0])
  );
  console.log(absorbtionCoef);
  //TOP VIEW STATE
  const [containerWidth, setContainerWidth] = useState(window.innerWidth / 2);
  const [containerHeight, setContainerHeight] = useState(
    window.innerHeight / 2
  );

  const drawingWidth = Math.round(containerWidth / 1.2);
  const drawingHeight = Math.round(containerHeight / 1.2);

  const boundaryCoordY = Math.round(drawingHeight / 2);
  const boundaryCoordX = Math.round(drawingWidth / 2);

  const changePointCoordinates = (newPoint, index) => {
    const newPointX = Number(newPoint[0]);
    const newPointY = Number(newPoint[1]);

    if (
      (!newPointX && newPointX !== 0) ||
      (!newPointY && newPointY !== 0) ||
      (!index && index !== 0)
    ) {
      console.log("Cannot set new point!");
      return;
    }

    const updatedPoint = [newPointX, newPointY];
    const newMatrix = [...topPointMatrix];
    newMatrix[index] = updatedPoint;

    setTopPointMatrix(newMatrix);
  };
  // Update absorbtionCoef if topPointMatrix length changes
  useEffect(() => {
    setAbsorbtionCoef(
      new Array(topPointMatrix.length).fill(Object.keys(materials)[0])
    );
  }, [topPointMatrix.length, materials]);
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-600 p-8">
      <div className="flex ">
        <div className="flex flex-col gap-5 justify-center items-center secondary-box p-4">
          <Controls
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setTopPointMatrix={setTopPointMatrix}
          />
          <TopView
            absorbtionCoef={absorbtionCoef}
            setAbsorbtionCoef={setAbsorbtionCoef}
            listenerPoint={listenerPoint}
            setListenerPoint={setListenerPoint}
            setSourcePoint={setSourcePoint}
            sourcePoint={sourcePoint}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            setContainerWidth={setContainerWidth}
            setContainerHeight={setContainerHeight}
            drawingWidth={drawingWidth}
            drawingHeight={drawingHeight}
            boundaryCoordX={boundaryCoordX}
            boundaryCoordY={boundaryCoordY}
            activeTab={activeTab}
            topPointMatrix={topPointMatrix}
            setTopPointMatrix={setTopPointMatrix}
          />
        </div>

        <PointInput
          absorbtionCoef={absorbtionCoef}
          setAbsorbtionCoef={setAbsorbtionCoef}
          ceilingHeight={ceilingHeight}
          setCeilingHeight={setCeilingHeight}
          boundaryCoordX={boundaryCoordX}
          boundaryCoordY={boundaryCoordY}
          topPointMatrix={topPointMatrix}
          setTopPointMatrix={setTopPointMatrix}
          changePointCoordinates={changePointCoordinates}
        />
      </div>
      <div className="secondary-box">
        <AbsorbtionDropdown
          topPointMatrix={topPointMatrix}
          absorbtionCoef={absorbtionCoef}
          setAbsorbtionCoef={setAbsorbtionCoef}
        />
      </div>
    </div>
  );
}

export default App;
