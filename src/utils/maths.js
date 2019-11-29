export function dist (a, b) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return dx * dx + dy * dy + dz * dz
}

export function randFloat (low, high) {
  return low + Math.random() * (high - low)
}

export function randInt (low, high) {
  return Math.floor(randFloat(low, high))
}

export function lerp (norm, min, max) {
  return (max - min) * norm + min
}

export function pointOnSphere (r, phi, theta) {
  const x = r * Math.cos(phi) * Math.cos(theta)
  const y = r * Math.cos(phi) * Math.sin(theta)
  const z = r * Math.sin(phi)
  return { x, y, z }
}
