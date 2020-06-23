const square = x => x * x;

export const distance = (point1, point2) => Math.sqrt(
  square(point1.x - point2.x) + square(point1.y - point2.y)
);

/**
 * Find closest point to given (x, y) within given circle.
 */
export const closestTo = (x, y, circle) => {
  let direction = { x: x - circle.x, y: y - circle.y };
  let normalized = normalize(direction);
  return {
    x: circle.x + normalized.x * circle.radius,
    y: circle.y + normalized.y * circle.radius
  };
}

/**
 * Cast given vector to vector with same direction and length = 1.
 */
const normalize = (vector) => {
  let length = distance({ x: 0, y: 0 }, vector);
  return { x: vector.x / length, y: vector.y / length };
}
