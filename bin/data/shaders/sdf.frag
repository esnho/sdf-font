#version 120

uniform sampler2DRect tex0;
uniform sampler2DRect tex1;
uniform vec2 windowSize;
uniform float time;
uniform float fader;
uniform float zoom;

uniform float smoothing = 1.0/16.0;

// https://github.com/libgdx/libgdx/wiki/Distance-field-fonts
// https://github.com/w8r/sdf-text-glyph-by-glyph
void main()
{
    // gl_FragCoord contains the window relative coordinate for the fragment.
    // we use gl_FragCoord.x position to control the red color value.
    // we use gl_FragCoord.y position to control the green color value.
    // please note that all r, g, b, a values are between 0 and 1.

    float r = abs(sin((gl_FragCoord.x / gl_FragCoord.x) + time));
    float g = abs(sin((gl_FragCoord.y / gl_FragCoord.y) + time * .9));
    float b = 1.0;
    float a = 1.0;
    vec3 changingColor = vec3(r, g, b);
    vec3 white = vec3(1.0, 1.0, 1.0);

    float d1 = texture2DRect(tex0, vec2(gl_FragCoord.x, windowSize.y - gl_FragCoord.y) * zoom).a;
    float d2 = texture2DRect(tex1, vec2(gl_FragCoord.x, windowSize.y - gl_FragCoord.y) * zoom).a;

    float d = mix(d1, d2, fader);

    float alpha = smoothstep(0.5 - smoothing, 0.5 + smoothing, d);

    gl_FragColor = vec4(white, 1.0 * alpha);
}