//
//  utility.h
//  SDF_text
//
//  Created by Luca Moroni on 05/10/2020.
//

#ifndef utility_h
#define utility_h

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

#endif /* utility_h */
