// File path: src/components/TopView.js

import React, { useState, useEffect } from "react";

export const TopView = ({ topPointMatrix, setTopPointMatrix }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragged, setDragged] = useState(false);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth / 2);
  const [containerHeight, setContainerHeight] = useState(
    window.innerHeight / 2
  );

  const drawingWidth = Math.round(containerWidth / 1.2);
  const drawingHeight = Math.round(containerHeight / 1.2);

  const boundaryCoordY = Math.round(drawingHeight / 2);
  const boundaryCoordX = Math.round(drawingWidth / 2);

  console.log({
    drawingWidth,
    drawingHeight,
    boundaryCoordX,
    boundaryCoordY,
    containerWidth,
    containerHeight,
  });
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
    setMousePosition({ x, y });

    // Update position if dragging
    if (draggingIndex !== null) {
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
    if (dragged) {
      setDragged(false);
      return;
    }
    console.log(`Mouse Position: X: ${mousePosition.x}, Y: ${mousePosition.y}`);
    const newPointMatrix = [
      ...topPointMatrix,
      [mousePosition.x, mousePosition.y],
    ];
    setTopPointMatrix(newPointMatrix);
  };

  const renderExistingPoints = () => {
    return topPointMatrix.map((point, index) => {
      const [x, y] = point;
      const left = `${boundaryCoordX + x}px`;
      const top = `${boundaryCoordY - y}px`; // Ensure to invert Y-axis here

      const dotSize = 8;
      const halfDotSize = dotSize / 2;
      return (
        <div
          key={index}
          className="absolute bg-blue-500 rounded-full cursor-pointer"
          style={{
            width: dotSize, // Adjust size as needed
            height: dotSize,
            left: `calc(${left} - ${halfDotSize}px)`, // Center the dot horizontally
            top: `calc(${top} - ${halfDotSize}px)`, // Center the dot vertically
          }}
          onMouseDown={() => handleMouseDown(index)}
        ></div>
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
    >
      <div
        className={`bg-green-400`} // Use classes for static styling
        style={{
          width: drawingWidth,
          height: drawingHeight,
          position: "relative",
        }}
      >
        {renderPolygon()}
        {renderExistingPoints()}
      </div>
      <div className="absolute top-0 left-0 m-2 text-white">
        Mouse Position: {`X: ${mousePosition.x}, Y: ${mousePosition.y}`}
      </div>
    </div>
  );
};
