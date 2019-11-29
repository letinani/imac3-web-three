attribute float size;
attribute vec3 color;
attribute vec3 velocity;

uniform float uTime;

varying vec3 vColor;

void main() {
  vColor = color;

  vec3 p = position + velocity * uTime;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);

  gl_PointSize = size * ( 10.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}