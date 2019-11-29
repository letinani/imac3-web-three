uniform sampler2D uTexture;

varying vec3 vColor;

void main() {
  vec4 texture = texture2D(uTexture, gl_PointCoord);
  vec3 color = vColor * texture.rgb;
  gl_FragColor = vec4(color, texture.a);
}