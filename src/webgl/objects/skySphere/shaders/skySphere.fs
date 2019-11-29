precision lowp float;

uniform vec3 uColorUp;
uniform vec3 uColorDown;
uniform vec3 uColorMiddle;

varying vec2 vUv;

void main() {
    vec3 color =vec3(0.);

    float step1 = 0.0;
    float step2 = 0.5;
    float step3 = 1.;

    float dist = distance(0., vUv.y);

    color = mix(uColorDown, uColorMiddle, smoothstep(step1, step2, vUv.y));
    color = mix(color, uColorUp, smoothstep(step2, step3, vUv.y));

    gl_FragColor = vec4(color, 1.);
}