precision highp float;

uniform float uTime;
uniform vec3 uColorUp;
uniform vec3 uColorDown;

varying vec2 vUv;
varying float vHeight;
varying float vRipple;

void main() {
  gl_FragColor = vec4(mix(uColorUp, uColorDown, vHeight), vRipple);
}
