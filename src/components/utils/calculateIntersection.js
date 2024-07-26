// File path: src/utils/lineEquations.js
// if (pointMatrix.length < 2) {
//   console.log("Less than 2 points");
//   return;
// }
// File path: src/utils/lineEquations.js

export const generateLineEquations = (pointMatrix) => {
  const equations = [];
  const n = pointMatrix.length;

  for (let i = 0; i < n; i++) {
    const [x1, y1] = pointMatrix[i];
    const [x2, y2] = pointMatrix[(i + 1) % n]; // Use modulo to wrap around to the first point

    const slope = x2 - x1 !== 0 ? (y2 - y1) / (x2 - x1) : Infinity; // Handle vertical lines
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const midpoint = [Math.round((x1 + x2) / 2), Math.round((y1 + y2) / 2)];

    equations.push({
      slope,
      length,
      midpoint,
      firstPoint: [x1, y1], //starting point of the line
      secondPoint: [x2, y2], //end point of the line
    });
  }

  return equations;
};

export const findIntersection = (pointMatrix, newPoint, excludePoint) => {
  if (pointMatrix.length < 3) return;
  const [newX, newY] = newPoint;
  const [xExclude, yExclude] = excludePoint;

  for (let i = 0; i < pointMatrix.length - 1; i++) {
    const [x1, y1] = pointMatrix[i];
    const [x2, y2] = pointMatrix[i + 1];

    if (
      (x1 === xExclude && y1 === yExclude) ||
      (x2 === xExclude && y2 === yExclude)
    ) {
      continue; // Skip lines involving the excluded point
    }

    // Line equation for the existing segment
    const slope1 = (y2 - y1) / (x2 - x1);
    const intercept1 = y1 - slope1 * x1;

    // Line equation for the new segment
    const slope2 = (newY - yExclude) / (newX - xExclude);
    const intercept2 = yExclude - slope2 * xExclude;

    // Find the intersection point
    const intersectX = (intercept2 - intercept1) / (slope1 - slope2);
    const intersectY = slope1 * intersectX + intercept1;

    // Check if the intersection point is within the bounds of the segments
    if (
      intersectX >= Math.min(x1, x2) &&
      intersectX <= Math.max(x1, x2) &&
      intersectY >= Math.min(y1, y2) &&
      intersectY <= Math.max(y1, y2) &&
      intersectX >= Math.min(xExclude, newX) &&
      intersectX <= Math.max(xExclude, newX) &&
      intersectY >= Math.min(yExclude, newY) &&
      intersectY <= Math.max(yExclude, newY)
    ) {
      return { index: i, intersection: [intersectX, intersectY] };
    }
  }
  return null;
};
