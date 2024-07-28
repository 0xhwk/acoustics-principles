import { generateLineEquations } from "./calculateIntersection";

export function calculateArea(pointMatrix) {
  if (pointMatrix.length <= 2) {
    console.log("Not enough points to calculate area!");
  }
  const n = pointMatrix.length;
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < n; i++) {
    const [x1, y1] = pointMatrix[i];
    const [x2, y2] = pointMatrix[(i + 1) % n];
    sum1 += x1 * y2;
    sum2 += y1 * x2;
  }

  return Math.abs(sum1 - sum2) / 2;
}

export function calculateVolume(pointMatrix, height) {
  if (pointMatrix.length <= 2 || !height) {
    console.log("Missing arguments for volume calc.!");
  }

  const area = calculateArea(pointMatrix);

  return area * height;
}
