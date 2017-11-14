#version 330

uniform sampler2D uTexture;

in vec2 vTexCoord;
out vec4 outColor;

vec3 applyExposure(vec3 color, float exposure){
    float gamma = 2.2;
    vec3 mapped = vec3(1.0) -exp(-color * exposure);
    return pow(mapped, vec3(1.0/gamma));
}

void main(void) {
    vec3 color = texture(uTexture, vTexCoord).xyz;


    vec3 highGammaColor = applyExposure(color, 2.0);
    vec3 lowGammaColor = applyExposure(color, 0.5);
    outColor = vec4(mix(highGammaColor, lowGammaColor, 0.5), 1.0);
}