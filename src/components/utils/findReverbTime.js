import { calculateDistanceBetween2Points } from "./disanceBetween2Points";
import { calculateArea, calculateVolume } from "./formulas";
import { absorbtionTable } from "../tables/absorbtionTable";
export function calculateReverbTime(
  pointMatrix,
  ceilingHeight,
  lineEquations,
  wallMaterial,
  ceilingMaterial,
  floorMaterial
) {
  const volume = calculateVolume(pointMatrix, ceilingHeight);
  const frequencies = absorbtionTable.frequencies;
  const polygonArea = calculateArea(pointMatrix);
  //Se for walls,ceil,floor

  let SeValues = {
    125: 0,
    250: 0,
    500: 0,
    1000: 0,
    2000: 0,
    4000: 0,
  };
  // CALCULATE SE FOR WALLS ONLY
  for (let i = 0; i < lineEquations.length; i++) {
    const lineEquation = lineEquations[i];
    const { firstPoint, secondPoint } = lineEquation;

    const baseLength = calculateDistanceBetween2Points(firstPoint, secondPoint);
    const area = baseLength * ceilingHeight;

    for (let j = 0; j < frequencies.length; j++) {
      const freq = frequencies[j];
      const Se = absorbtionTable.materials[wallMaterial[i]][j] * area;
      SeValues[freq] = SeValues[freq] + Se;
    }
  }

  //ADD CEILING SE and FLOOR SE
  for (let c = 0; c < frequencies.length; c++) {
    const freq = frequencies[c];

    const Sec = absorbtionTable.materials[ceilingMaterial][c] * polygonArea;
    const Sef = absorbtionTable.materials[floorMaterial][c] * polygonArea;

    SeValues[freq] = SeValues[freq] + Sec + Sef;
  }

  const RT60125 = (0.16 * volume) / SeValues[125];
  const RT60250 = (0.16 * volume) / SeValues[250];
  const RT60500 = (0.16 * volume) / SeValues[500];
  const RT601000 = (0.16 * volume) / SeValues[1000];
  const RT602000 = (0.16 * volume) / SeValues[2000];
  const RT604000 = (0.16 * volume) / SeValues[4000];
  const RT60 = {
    125: RT60125,
    250: RT60250,
    500: RT60500,
    1000: RT601000,
    2000: RT602000,
    4000: RT604000,
  };

  const RT60Avg =
    (RT60125 + RT60250 + RT60500 + RT601000 + RT602000 + RT604000) / 6;
  return { SeValues, RT60, RT60Avg };
}
