#version 120

uniform sampler2DRect tex0;
uniform vec2 windowSize;

const float smoothing = 1.0/16.0;

// https://github.com/libgdx/libgdx/wiki/Distance-field-fonts
// https://github.com/w8r/sdf-text-glyph-by-glyph
void main()
{
    // gl_FragCoord contains the window relative coordinate for the fragment.
    // we use gl_FragCoord.x position to control the red color value.
    // we use gl_FragCoord.y position to control the green color value.
    // please note that all r, g, b, a values are between 0 and 1.

    float windowWidth = 1024.0;
    float windowHeight = 768.0;

    float r = gl_FragCoord.x / windowWidth;
    float g = gl_FragCoord.y / windowHeight;
    float b = 1.0;
    float a = 1.0;
    gl_FragColor = vec4(r, g, b, a);

    gl_FragColor = vec4(r, g, 1.0, 1.0);


//    vec2 pos = gl_TexCoord[0].st;
    float d = texture2DRect(tex0, vec2(gl_FragCoord.x, windowSize.y - gl_FragCoord.y)).a;

    float alpha = smoothstep(0.5 - smoothing, 0.5 + smoothing, d);
    gl_FragColor = vec4(vec3(1.0, 1.0, 1.0), 1.0 * alpha);
}


/*

 #version 120

 uniform sampler2DRect tex0;

 void main (void){
     vec2 pos = gl_TexCoord[0].st;

     vec4 rTxt = texture2DRect(tex0, pos);

     vec4 color = vec4(0,0,0,0);

     gl_FragColor = vec4(1,0,0,0);
 }

 */