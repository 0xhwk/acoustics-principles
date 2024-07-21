import { useState } from "react";
import { TopView } from "./components/topView";
import { Controls } from "./components/controls";

function App() {
  const [topPointMatrix, setTopPointMatrix] = useState([]);
  const [sidePointMatrix, setSidePointMatrix] = useState([]);
  const [listenerPoint, setListenerPoint] = useState([]);
  const [sourcePoint, setSourcePoint] = useState([]);

  console.log({ topPointMatrix, sidePointMatrix, listenerPoint, sourcePoint });
  return (
    <div className="h-screen w-screen bg-gray-600">
      <Controls />
      <TopView
        topPointMatrix={topPointMatrix}
        setTopPointMatrix={setTopPointMatrix}
      />
    </div>
  );
}

export default App;
