import { mirrorPointAcrossLine } from "./mirrorPoint";
import { soundVelocity } from "../tables/config";
import { calculateDistanceBetween2Points } from "./disanceBetween2Points";

const findEarliestReflection = (lineEquations, sourcePoint, listenerPoint) => {
  let earliestReflection = {
    reflectionDistance: null, //number:meters
    mirroredPoint: null, //[number]:point
    earliestReflectionTime: null, //number:seconds
    directDistance: null, //number:meters
    directTime: null, //number:seconds
    directLine: false, //number:meters
    initialTimeDiff: null,
  };
  let minDistance = Infinity;

  const directDistance = calculateDistanceBetween2Points(
    sourcePoint,
    listenerPoint
  );
  let directLine = true;

  // Check if there's a direct line between sourcePoint and listenerPoint
  for (let i = 0; i < lineEquations.length; i++) {
    const edge = lineEquations[i];
    const [ex1, ey1] = edge.firstPoint;
    const [ex2, ey2] = edge.secondPoint;

    if (
      doLineSegmentsIntersect(
        sourcePoint,
        listenerPoint,
        [ex1, ey1],
        [ex2, ey2]
      )
    ) {
      directLine = false;
      return earliestReflection;
    }
  }

  for (let i = 0; i < lineEquations.length; i++) {
    const line = lineEquations[i];
    const mirroredListener = mirrorPointAcrossLine(listenerPoint, line);
    const [x1, y1] = mirroredListener;
    const [x2, y2] = sourcePoint;

    let intersects = false;

    for (let j = 0; j < lineEquations.length; j++) {
      // Skip the line used for mirroring
      if (i === j) continue;

      const edge = lineEquations[j];
      const [ex1, ey1] = edge.firstPoint;
      const [ex2, ey2] = edge.secondPoint;

      if (doLineSegmentsIntersect([x1, y1], [x2, y2], [ex1, ey1], [ex2, ey2])) {
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      const reflectionDistance = calculateDistanceBetween2Points(
        sourcePoint,
        mirroredListener
      );

      if (reflectionDistance < minDistance) {
        minDistance = reflectionDistance;
        earliestReflection.reflectionDistance = reflectionDistance;
        earliestReflection.mirroredPoint = mirroredListener;
        earliestReflection.earliestReflectionTime =
          reflectionDistance / soundVelocity;
        earliestReflection.directDistance = directDistance;
        earliestReflection.directTime = directDistance / soundVelocity;
      }
    }
  }

  earliestReflection.directLine = directLine;
  earliestReflection.initialTimeDiff =
    earliestReflection.earliestReflectionTime - earliestReflection.directTime;
  return earliestReflection;
};

const orientation = (p, q, r) => {
  const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
  if (val === 0) return 0; // parallel lines
  return val > 0 ? 1 : 2; // crossing lines
};

const doLineSegmentsIntersect = (p1, q1, p2, q2) => {
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  // General case
  return o1 !== o2 && o3 !== o4;
};

export default findEarliestReflection;
