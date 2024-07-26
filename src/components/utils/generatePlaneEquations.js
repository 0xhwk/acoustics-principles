//USED FOR GENERATING PLANE EQUATIONS FROM POINT MATRIX (AKA ONLY USE FOR WALLS EQUATIONS)

export function generatePlaneEquations(pointMatrix, height) {
  if (pointMatrix.length <= 2) {
    console.log("Not enough points to calculate plane equations.");
    return;
  }

  const planeEquations = [];
  const threeDPointMatrix = [];

  // Step 2: Convert each 2D point to two 3D points
  for (let i = 0; i < pointMatrix.length; i++) {
    const [x, y] = pointMatrix[i];
    threeDPointMatrix.push([
      [x, y, 0],
      [x, y, height],
    ]);
  }

  // Step 3: Group points to form planes
  const planes = [];
  for (let i = 0; i < pointMatrix.length; i++) {
    const p1 = threeDPointMatrix[i][0];
    const p1Prime = threeDPointMatrix[i][1];
    const p2 = threeDPointMatrix[(i + 1) % pointMatrix.length][0]; // Next point, wrap around using modulo
    const p2Prime = threeDPointMatrix[(i + 1) % pointMatrix.length][1]; // Next point, wrap around using modulo
    planes.push([p1, p1Prime, p2, p2Prime]);
  }

  // Helper function to calculate plane equation from four points
  function calculatePlaneEquation(p1, p1Prime, p2, p2Prime) {
    // Construct vectors
    const v1 = [p1Prime[0] - p1[0], p1Prime[1] - p1[1], p1Prime[2] - p1[2]];
    const v2 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];

    // Compute the normal vector via cross product
    const normal = [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0],
    ];

    const [A, B, C] = normal;
    const D = -(A * p1[0] + B * p1[1] + C * p1[2]);

    // Return the plane equation coefficients
    return { A, B, C, D };
  }

  // Step 4: Loop over 3D point groups to form plane equations
  for (const group of planes) {
    const [p1, p1Prime, p2, p2Prime] = group;
    const equation = calculatePlaneEquation(p1, p1Prime, p2, p2Prime);
    planeEquations.push(equation);
  }
  console.log(planeEquations);
  // Step 5: Return the plane equations array
  return planeEquations;
}

//USED FOR GENERATING PLANE EQ. FROM CUSTOM POINTS
export function generateCustomPlaneEquation(pointArray, height) {}
