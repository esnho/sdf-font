#include "ofApp.h"
#include "utility.h"
#include "defaults.h"

//--------------------------------------------------------------
void ofApp::setup(){
    gui.setup();
    gui.add(smooth.setup("smooth", DEFAULT_SMOOTH, MIN_SMOOTH, MAX_SMOOTH));

    shader.load("shaders/sdf.vert", "shaders/sdf.frag");
    SDFfont.load("fonts/arialblack.png");
    SDFtexture = SDFfont.getTexture();
//    SDFtexture.generateMipmap(); check how to change GL_TEXTURE_RECTANGLE to GL_TEXTURE2D
    SDFtexture.setTextureMinMagFilter(GL_LINEAR, GL_LINEAR);
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
    shader.begin();

    // set uniforms
    shader.setUniformTexture("tex0", SDFtexture, 0);
    shader.setUniform2f("windowSize", ofGetWindowWidth(), ofGetWindowHeight());
    shader.setUniform1f("smoothing", smooth / 16.0);
    shader.setUniform1f("time", ofGetElapsedTimef());

    // draw
    SDFtexture.draw(0, 0, ofGetWindowWidth(), ofGetWindowHeight());
    shader.end();

    // finish
    checkGlError();
    gui.draw();
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
