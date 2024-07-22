import { useState } from "react";
import { TopView } from "./components/topView";
import { Controls } from "./components/controls";
import { PointInput } from "./components/pointInput";

function App() {
  const [topPointMatrix, setTopPointMatrix] = useState([]);
  const [sidePointMatrix, setSidePointMatrix] = useState([]);
  const [listenerPoint, setListenerPoint] = useState([]);
  const [sourcePoint, setSourcePoint] = useState([]);
  const [activeTab, setActiveTab] = useState("add");

  // console.log({ topPointMatrix, sidePointMatrix, listenerPoint, sourcePoint });
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
            activeTab={activeTab}
            topPointMatrix={topPointMatrix}
            setTopPointMatrix={setTopPointMatrix}
          />
        </div>
        <PointInput
          topPointMatrix={topPointMatrix}
          setTopPointMatrix={setTopPointMatrix}
        />
      </div>
      <div className="secondary-box">dsadsa</div>
    </div>
  );
}

export default App;
