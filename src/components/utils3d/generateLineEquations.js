export const generateLineEquations3D = (pointMatrix) => {
  const equations = [];
  const n = pointMatrix.length;

  for (let i = 0; i < n; i++) {
    const [x1, y1, z1] = pointMatrix[i];
    const [x2, y2, z2] = pointMatrix[(i + 1) % n]; // Use modulo to wrap around to the first point

    // Compute direction vector of the line segment
    const direction = [x2 - x1, y2 - y1, z2 - z1];
    const length = Math.sqrt(
      direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2
    );

    // Normalize the direction vector
    const unitDirection = direction.map((coord) => coord / length);

    // Compute midpoint of the segment
    const midpoint = [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2];

    equations.push({
      direction: unitDirection,
      length,
      midpoint,
      startPoint: [x1, y1, z1], // Starting point of the line
      endPoint: [x2, y2, z2], // End point of the line
    });
  }

  return equations;
};
