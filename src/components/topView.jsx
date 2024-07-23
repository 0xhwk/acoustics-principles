// File path: src/components/TopView.js

import React, { useState, useEffect } from "react";
import {
  findIntersection,
  generateLineEquations,
} from "./utils/calculateIntersection";

export const TopView = ({
  listenerPoint,
  setListenerPoint,
  setSourcePoint,
  sourcePoint,
  containerWidth,
  containerHeight,
  setContainerWidth,
  setContainerHeight,
  drawingWidth,
  drawingHeight,
  boundaryCoordX,
  boundaryCoordY,
  topPointMatrix,
  setTopPointMatrix,
  activeTab,
  setAbsorbtionCoef,
  absorbtionCoef,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragged, setDragged] = useState(false);

  const [popoverOpen, setPopoverOpen] = useState(true);

  //   console.log({
  //     drawingWidth,
  //     drawingHeight,
  //     boundaryCoordX,
  //     boundaryCoordY,
  //     containerWidth,
  //     containerHeight,
  //   });
  const popover = (i, x, y, z = "0") => {
    return (
      <div
        className={`${
          !popoverOpen && "!hidden"
        }  flex !flex-row text-nowrap p-2 secondary-box w-min translate-x-[10px] translate-y-[10px] !text-[10px]`}
      >
        <div>{`${i}:(${x},${y},${z})`}</div>
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth / 2);
      setContainerHeight(window.innerHeight / 2);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = Math.max(
      -boundaryCoordX,
      Math.min(boundaryCoordX, Math.round(event.clientX - rect.left - centerX))
    );
    const y = Math.max(
      -boundaryCoordY,
      Math.min(
        boundaryCoordY,
        Math.round(-(event.clientY - rect.top - centerY))
      )
    );
    let coordinates = { x, y };

    setMousePosition(coordinates);
    if (draggingIndex == "source") {
      setSourcePoint([x, y]);
    }

    if (draggingIndex == "listener") {
      setListenerPoint([x, y]);
    }

    // Update position if dragging
    if (
      draggingIndex !== null &&
      draggingIndex !== "source" &&
      draggingIndex !== "listener"
    ) {
      const newTopPointMatrix = [...topPointMatrix];
      newTopPointMatrix[draggingIndex] = [x, y];
      setTopPointMatrix(newTopPointMatrix);
    }
  };

  const handleMouseDown = (index) => {
    setDraggingIndex(index);
    setDragged(true);
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  const createPoint = () => {
    if (activeTab == "remove") return;
    if (dragged) {
      setDragged(false);
      return;
    }
    const newPoint = [mousePosition.x, mousePosition.y];

    // 1. Check for intersections with lines excluding the starting point
    const intersectionResultStart = findIntersection(
      topPointMatrix,
      newPoint,
      topPointMatrix[0]
    );

    if (intersectionResultStart) {
      const { index } = intersectionResultStart;
      const newPointMatrix = [
        ...topPointMatrix.slice(0, index + 1),
        newPoint,
        ...topPointMatrix.slice(index + 1),
      ];
      setTopPointMatrix(newPointMatrix);
    } else {
      // 2. Check for intersections with lines excluding the ending point
      const intersectionResultEnd = findIntersection(
        topPointMatrix,
        newPoint,
        topPointMatrix[topPointMatrix.length - 1]
      );

      if (intersectionResultEnd) {
        const { index } = intersectionResultEnd;
        const newPointMatrix = [
          ...topPointMatrix.slice(0, index + 1),
          newPoint,
          ...topPointMatrix.slice(index + 1),
        ];
        setTopPointMatrix(newPointMatrix);
      } else {
        const newPointMatrix = [...topPointMatrix, newPoint];
        setTopPointMatrix(newPointMatrix);
      }
    }
  };

  const renderSourcePoint = () => {
    const [x, y] = sourcePoint;
    const left = `${boundaryCoordX + x}px`;
    const top = `${boundaryCoordY - y}px`; // Ensure to invert Y-axis here
    const dotSize = 8;
    const halfDotSize = dotSize / 2;
    const leftNudged = left - halfDotSize;
    const topNudged = top - halfDotSize;
    return (
      <div
        key={"source"}
        className={`absolute z-50 bg-purple-500 rounded-full cursor-pointer`}
        style={{
          width: dotSize, // Adjust size as needed
          height: dotSize,
          left: `calc(${left} - ${halfDotSize}px)`, // Center the dot horizontally
          top: `calc(${top} - ${halfDotSize}px)`, // Center the dot vertically
        }}
        onMouseDown={() => {
          if (activeTab === "remove") return;
          handleMouseDown("source");
        }}
      >
        {popover("source", x, y, "0", topNudged, leftNudged)}
      </div>
    );
  };
  const renderListenerPoint = () => {
    const [x, y] = listenerPoint;
    const left = `${boundaryCoordX + x}px`;
    const top = `${boundaryCoordY - y}px`; // Ensure to invert Y-axis here
    const dotSize = 8;
    const halfDotSize = dotSize / 2;
    const leftNudged = left - halfDotSize;
    const topNudged = top - halfDotSize;
    return (
      <div
        key={"listener"}
        className={`absolute z-50 bg-cyan-600 rounded-full cursor-pointer`}
        style={{
          width: dotSize, // Adjust size as needed
          height: dotSize,
          left: `calc(${left} - ${halfDotSize}px)`, // Center the dot horizontally
          top: `calc(${top} - ${halfDotSize}px)`, // Center the dot vertically
        }}
        onMouseDown={() => {
          if (activeTab === "remove") return;
          handleMouseDown("listener");
        }}
      >
        {popover("listenerPoint", x, y, "0", topNudged, leftNudged)}
      </div>
    );
  };
  const renderExistingPoints = () => {
    return topPointMatrix.map((point, index) => {
      const [x, y] = point;
      const left = `${boundaryCoordX + x}px`;
      const top = `${boundaryCoordY - y}px`; // Ensure to invert Y-axis here
      const dotSize = 8;
      const halfDotSize = dotSize / 2;
      const leftNudged = left - halfDotSize;
      const topNudged = top - halfDotSize;

      return (
        <React.Fragment key={index}>
          <div
            key={index}
            className={`absolute bg-blue-500 rounded-full cursor-pointer`}
            style={{
              width: dotSize, // Adjust size as needed
              height: dotSize,
              left: `calc(${left} - ${halfDotSize}px)`, // Center the dot horizontally
              top: `calc(${top} - ${halfDotSize}px)`, // Center the dot vertically
            }}
            onClick={() => {
              if (activeTab !== "remove") return;
              const newMatrix = topPointMatrix.filter((_, i) => i !== index);
              setTopPointMatrix(newMatrix);
            }}
            onMouseDown={() => {
              if (activeTab === "remove") return;
              handleMouseDown(index);
            }}
          >
            {popover(index, x, y, "0", topNudged, leftNudged)}
          </div>
        </React.Fragment>
      );
    });
  };

  const renderLineLengths = () => {
    const lineEquations = generateLineEquations(topPointMatrix);
    return lineEquations.map((line, index) => {
      return (
        <div
          key={index}
          className="p-1 !text-[10px] absolute z-40 bg-purple-500 secondary-box"
          style={{
            left: `${boundaryCoordX + line.midpoint[0] - 12}px`,
            top: `${boundaryCoordY - line.midpoint[1] - 12}px`,
          }}
        >
          {Math.round(line.length)}
        </div>
      );
    });
  };

  const renderPolygon = () => {
    const points = topPointMatrix
      .map(([x, y]) => `${boundaryCoordX + x},${boundaryCoordY - y}`) // Note inversion of Y-axis
      .join(" ");

    return (
      <svg
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <polygon points={points} stroke="blue" strokeWidth="1" fill="yellow" />
      </svg>
    );
  };

  return (
    <div
      className={`bg-red-500 flex items-center justify-center relative`} // Use classes for static styling
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp} // Handle mouse up to stop dragging
      onClick={createPoint}
      onMouseEnter={() => setPopoverOpen(true)}
      onMouseLeave={() => setPopoverOpen(false)}
    >
      <div
        className={`bg-green-400`} // Use classes for static styling
        style={{
          width: drawingWidth,
          height: drawingHeight,
          position: "relative",
        }}
      >
        {renderListenerPoint()}
        {renderSourcePoint()}
        {renderLineLengths()}
        {renderPolygon()}
        {renderExistingPoints()}
      </div>
      <div className="absolute top-0 left-0 m-2 text-white">
        Mouse Position: {`X: ${mousePosition.x}, Y: ${mousePosition.y}`}
      </div>
    </div>
  );
};
