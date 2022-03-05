#ifdef GL_ES
precision mediump float;
#endif

varying highp vec2 vTextureCoord;
varying highp vec3 vFragPos;

uniform sampler2D uSampler;
uniform vec4 uAlbedo;

void main(void) { 

    gl_FragColor = vec4(gl_texture2D(uSampler, vTextureCoord).rgb, 1.0); 
    
}