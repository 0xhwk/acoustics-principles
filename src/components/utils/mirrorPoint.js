export function mirrorPointAcrossLine(point, line) {
  const [px, py] = point;
  const {
    firstPoint: [x1, y1],
    secondPoint: [x2, y2],
  } = line;

  // Line vector
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Vector from first point to the point
  const fx = px - x1;
  const fy = py - y1;

  // Project the vector onto the line
  const dotProduct = fx * dx + fy * dy;
  const lineLengthSquared = dx * dx + dy * dy;
  const t = dotProduct / lineLengthSquared;

  // Find the projection point
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;

  // Mirror the point
  const mirroredX = 2 * projX - px;
  const mirroredY = 2 * projY - py;

  return [mirroredX, mirroredY];
}
