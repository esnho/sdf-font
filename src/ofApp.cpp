#include "ofApp.h"
#include "utility.h"
#include "defaults.h"

const string fonts[] = {"fonts/000_Every-eye-must-weep-alone.png", "fonts/001_Till-I-Will-be-overthrown..png"};

string path = "fonts/To-Chester-Kallman";

vector<ofTexture> textures;

float interpolation = 0.0;
int firstTexture = 0;
int secondTexture = 0;

bool saveFrame = true;

//--------------------------------------------------------------
void ofApp::setup(){
    ofSetWindowShape(768, 576);
    ofSetFrameRate(24);
//    ofWindowSettings();
    ofSetVerticalSync(true);
    ofDirectory dir(path);
    dir.allowExt("png");
    dir.listDir();
    for(int i = 0; i < dir.size(); i++) {
        ofImage image;
        image.load(dir.getPath(i));
        ofTexture texture;
        texture = image.getTexture();
        texture.setTextureMinMagFilter(GL_LINEAR, GL_LINEAR);
        //    texture.generateMipmap(); check how to change GL_TEXTURE_RECTANGLE to GL_TEXTURE2D
        textures.push_back(texture);
    }

    gui.setup();
    gui.add(smooth.setup("smooth", DEFAULT_SMOOTH, MIN_SMOOTH, MAX_SMOOTH));
    gui.add(fader.setup("fader", 0, 0, 1));
    gui.add(zoom.setup("zoom", (float) textures[0].getWidth() / (float) textures[0].getHeight(),
                       0, 10));

    shader.load("shaders/sdf.vert", "shaders/sdf.frag");
}

//--------------------------------------------------------------
void ofApp::update(){
    fader = interpolation - floor(interpolation);
    firstTexture = floor(interpolation);
    secondTexture = firstTexture + 1;
    interpolation = interpolation + (ofGetLastFrameTime() * 0.5);
    if (secondTexture >= textures.size()) {
        interpolation = 0.0 + fader;
        firstTexture = 0;
        secondTexture = 1;
        saveFrame = false;
    }
}

//--------------------------------------------------------------
void ofApp::draw(){
    shader.begin();

    // set uniforms
    shader.setUniformTexture("tex0", textures[firstTexture], 0);
    shader.setUniformTexture("tex1", textures[secondTexture], 1);
    shader.setUniform2f("windowSize",
                        (float) ofGetWindowWidth() * (float) textures[0].getWidth() / (float) textures[0].getHeight(),
                        ofGetWindowHeight());
    shader.setUniform1f("smoothing", smooth / 16.0);
    shader.setUniform1f("fader", fader);
    shader.setUniform1f("zoom", zoom);
    shader.setUniform1f("time", ofGetElapsedTimef());

    // draw
    textures[firstTexture].draw(0, 0, ofGetWindowWidth(), ofGetWindowHeight());
    shader.end();

    // finish
    checkGlError();
    if (saveFrame) {
        ofSaveScreen(ofToString(ofGetFrameNum())+".png");
    }
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
