import { useState, useEffect } from "react";
import { TopView } from "./components/topView";
import { Controls } from "./components/controls";
import { PointInput } from "./components/pointInput";
import { AbsorbtionDropdown } from "./components/absorbtionDropdown";
import { absorbtionTable } from "./components/tables/absorbtionTable";
import { generateLineEquations } from "./components/utils/calculateIntersection";
import { mirrorPointAcrossLine } from "./components/utils/mirrorPoint";
import findEarliestReflection from "./components/utils/findEarliestReflection";
import { calculateReverbTime } from "./components/utils/findReverbTime";
import { calculateG } from "./components/utils/calculateSoundStregthG";
import { findClarityIndex } from "./components/utils/findClarityIndex";
import { SideView } from "./components/sideView";
import { SideViewYZ } from "./components/sideViewYZ";

function App() {
  const [activeTab, setActiveTab] = useState("add");
  //POINT STATE
  const [scale, setScale] = useState(10);
  const [topPointMatrix, setTopPointMatrix] = useState([]);
  const [ceilingHeight, setCeilingHeight] = useState(3);
  const [listenerPoint, setListenerPoint] = useState([scale, 0, 0]);
  const [sourcePoint, setSourcePoint] = useState([-scale, 0, 0]);
  const [lineEquations, setLineEquations] = useState([]);
  const [ceilingPoints, setCeilingPoints] = useState([]);
  const [floorPoints, setFloorPoints] = useState([]);
  //MATERIAL STATE
  const { materials } = absorbtionTable;
  const defaultMaterial = Object.keys(materials)[0];
  const defaultMaterialArray = new Array(topPointMatrix.length).fill(
    Object.keys(materials)[0]
  );
  const [wallMaterial, setWallMaterial] = useState(defaultMaterialArray);
  const [ceilingMaterial, setCeilingMaterial] = useState(defaultMaterial);
  const [floorMaterial, setFloorMaterial] = useState(defaultMaterial);

  //TOP VIEW STATE
  const [containerWidth, setContainerWidth] = useState(window.innerWidth / 2);
  const [containerHeight, setContainerHeight] = useState(
    window.innerHeight / 2
  );

  const drawingWidth = Math.round(containerWidth / 1.2);
  const drawingHeight = Math.round(containerHeight / 1.2);

  const boundaryCoordY = Math.round(drawingHeight / 2);
  const boundaryCoordX = Math.round(drawingWidth / 2);

  console.log({ ceilingPoints, floorPoints });
  //CHANGE INDIVIDUAL POINT COORDINATES
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

  //UPDATE WALL MATERIAL AND LINE EQUATIONS IF POINT COUNT CHANGES
  useEffect(() => {
    //UPDATE WALL MATERIAL
    setWallMaterial(
      new Array(topPointMatrix.length).fill(Object.keys(materials)[0])
    );

    //UPDATE LINE EQUATIONS
    setLineEquations(generateLineEquations(topPointMatrix));
  }, [topPointMatrix, materials]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-600 p-8">
      <div className="flex ">
        <div className="flex flex-col gap-5 justify-center items-center secondary-box p-4">
          <Controls
            scale={scale}
            setScale={setScale}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setTopPointMatrix={setTopPointMatrix}
            floorPoints={floorPoints}
            ceilingPoints={ceilingPoints}
            setFloorPoints={setFloorPoints}
            setCeilingPoints={setCeilingPoints}
          />
          <div className="flex">
            <div className="flex flex-col">
              <TopView
                scale={scale}
                setScale={setScale}
                lineEquations={lineEquations}
                wallMaterial={wallMaterial}
                setWallMaterial={setWallMaterial}
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
                floorPoints={floorPoints}
                ceilingPoints={ceilingPoints}
                setFloorPoints={setFloorPoints}
                setCeilingPoints={setCeilingPoints}
              />
              <SideView
                scale={scale}
                setScale={setScale}
                lineEquations={lineEquations}
                wallMaterial={wallMaterial}
                setWallMaterial={setWallMaterial}
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
                floorPoints={floorPoints}
                ceilingPoints={ceilingPoints}
                setFloorPoints={setFloorPoints}
                setCeilingPoints={setCeilingPoints}
              />
            </div>
            <div>
              <SideViewYZ
                scale={scale}
                setScale={setScale}
                lineEquations={lineEquations}
                wallMaterial={wallMaterial}
                setWallMaterial={setWallMaterial}
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
                floorPoints={floorPoints}
                ceilingPoints={ceilingPoints}
                setFloorPoints={setFloorPoints}
                setCeilingPoints={setCeilingPoints}
              />
              <div>3d</div>
            </div>
          </div>
        </div>

        <PointInput
          wallMaterial={wallMaterial}
          setWallMaterial={setWallMaterial}
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
          floorMaterial={floorMaterial}
          setFloorMaterial={setFloorMaterial}
          ceilingMaterial={ceilingMaterial}
          setCeilingMaterial={setCeilingMaterial}
          topPointMatrix={topPointMatrix}
          wallMaterial={wallMaterial}
          setWallMaterial={setWallMaterial}
        />
      </div>
      <button
        onClick={() => {
          const revtime = calculateReverbTime(
            topPointMatrix,
            ceilingHeight,
            lineEquations,
            wallMaterial,
            ceilingMaterial,
            floorMaterial
          );
          const earliest = findEarliestReflection(
            lineEquations,
            sourcePoint,
            listenerPoint
          );
          console.log("earliestRef:", earliest);
          const { SeValues, volume } = revtime;
          const Gvals = calculateG(sourcePoint, listenerPoint, revtime);
          console.log("revtime:", revtime);
          console.log("Gvalues:", Gvals);

          const Cindex = findClarityIndex(revtime, sourcePoint, listenerPoint);

          console.log("cindex", Cindex);
        }}
        className="primary-button"
      >
        calc
      </button>
    </div>
  );
}

export default App;
