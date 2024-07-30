export function generateRectangularPointGroups(pointMatrix, view) {
  const result = [];
  const n = pointMatrix.length;

  if (n < 4) {
    return [pointMatrix];
  }

  for (let i = 0; i < n - 2; i += 2) {
    const group = [
      pointMatrix[i],
      pointMatrix[i + 1],
      pointMatrix[i + 2],
      pointMatrix[i + 3],
    ];
    result.push(group);
  }

  const mod = (n / 2) % 2 == 0 ? [2, 1] : [1, 2];
  console.log((n / 2) % 2 == 0);
  // Add the last group, which wraps around to the start
  result.push([
    pointMatrix[n - mod[0]],
    pointMatrix[n - mod[1]],
    pointMatrix[0],
    pointMatrix[1],
  ]);

  return result;
}
