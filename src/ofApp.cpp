#include "ofApp.h"
// https://github.com/libgdx/libgdx/wiki/Distance-field-fonts
// https://github.com/w8r/sdf-text-glyph-by-glyph
void checkGlError() {
    switch(glGetError()) {
        case GL_INVALID_ENUM:
            ofLogNotice("GL_INVALID_ENUM");
            break;
        case GL_INVALID_VALUE:
            ofLogNotice("GL_INVALID_VALUE");
            break;
        case GL_INVALID_OPERATION:
            ofLogNotice("GL_INVALID_OPERATION");
            break;
        case GL_INVALID_FRAMEBUFFER_OPERATION:
            ofLogNotice("GL_INVALID_FRAMEBUFFER_OPERATION");
            break;
        case GL_OUT_OF_MEMORY:
            ofLogNotice("GL_OUT_OF_MEMORY");
            break;
        case GL_STACK_UNDERFLOW:
            ofLogNotice("GL_STACK_UNDERFLOW");
            break;
        case GL_STACK_OVERFLOW:
            ofLogNotice("GL_STACK_OVERFLOW");
            break;
    }
}

//--------------------------------------------------------------
void ofApp::setup(){
    shader.load("shaders/sdf.vert", "shaders/sdf.frag");
    // shader.setupShaderFromFile(GL_FRAGMENT_SHADER, "shaders/sdf.frag");
    SDFfont.load("fonts/arialblack.png");
    ofPixels font;
    SDFtexture = SDFfont.getTexture();
//    SDFtexture.generateMipmap(); check how to change GL_TEXTURE_RECTANGLE to GL_TEXTURE2D
    SDFtexture.setTextureMinMagFilter(GL_LINEAR, GL_LINEAR);
}
// https://github.com/libgdx/libgdx/wiki/Distance-field-fonts
// https://github.com/w8r/sdf-text-glyph-by-glyph
//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){

    // SDFtexture.draw(300, 600);

    //SDFfont.getTexture().bind();
    shader.begin();
    shader.setUniformTexture("tex0", SDFtexture, 0);
    shader.setUniform2f("windowSize", ofGetWindowWidth(), ofGetWindowHeight());
    //ofDrawRectangle(150, 150, 100, 100);
    SDFtexture.draw(0, 0, ofGetWindowWidth(), ofGetWindowHeight());
    ofLogNotice(ofToString(ofGetWindowHeight()));
    // https://github.com/libgdx/libgdx/wiki/Distance-field-fonts
    // https://github.com/w8r/sdf-text-glyph-by-glyph
//    ofMesh mesh;
//    mesh.setMode(OF_PRIMITIVE_TRIANGLE_STRIP);
//
//    mesh.addVertex( ofPoint(150,150) );
//    mesh.addTexCoord( SDFtexture.getCoordFromPercent(0,0) );
//
//    mesh.addVertex( ofPoint(150+100,150) );
//    mesh.addTexCoord( SDFtexture.getCoordFromPercent(1,0) );
//
//    mesh.addVertex( ofPoint(150,150+100) );
//    mesh.addTexCoord( SDFtexture.getCoordFromPercent(0,1) );
//
//    mesh.addVertex( ofPoint(150+100,150+100) );
//    mesh.addTexCoord( SDFtexture.getCoordFromPercent(1,1) );
    shader.end();
    //SDFfont.getTexture().unbind();
    checkGlError();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
