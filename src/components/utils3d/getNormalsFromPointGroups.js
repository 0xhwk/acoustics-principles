export function calculatePlaneDirection(group) {
  if (group.length != 4) return;
  const [p1, p2, p3, p4] = group;

  // Calculate two vectors on the plane
  const vector1 = subtractVectors(p2, p1);
  const vector2 = subtractVectors(p3, p1);
  console.log(vector1);
  // Calculate the normal vector using cross product
  const normal = crossProduct(vector1, vector2);

  // Normalize the vector
  const normalizedNormal = normalizeVector(normal);

  // Determine the primary direction
  const direction = getPrimaryDirection(normalizedNormal);

  return {
    points: group,
    normal: normalizedNormal,
    facing: direction,
  };
}

export function subtractVectors(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
}

export function crossProduct(v1, v2) {
  return [
    v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0],
  ];
}

export function normalizeVector(v) {
  const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return [v[0] / length, v[1] / length, v[2] / length];
}

export function getPrimaryDirection(normal) {
  const absNormal = normal.map(Math.abs);
  const maxComponent = Math.max(...absNormal);
  const index = absNormal.indexOf(maxComponent);
  const direction = ["right", "up", "forward"];
  return normal[index] >= 0
    ? direction[index]
    : "opposite of " + direction[index];
}
