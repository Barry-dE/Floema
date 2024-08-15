precision highp float;

uniform sampler2D tMap;

varying vec2 vUv;

void main() {
    vec4 texture = texture2D(tMap, vUv);

    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}