import { oneSDFToImage } from './oneSDFToImage';
import { Text } from 'troika-three-text';
import {
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
  WebGLRenderer,
  OrthographicCamera,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const myText = new Text();
// Set properties to configure:
myText.text = 'where are you?'
myText.debugSDF = true;
myText.textAlign = 'center';
myText.anchorX = 'center';
myText.fontSize = 0.2
myText.position.z = -2
myText.color = 0xFFFFFF

// Update the rendering:
myText.sync()

let camera, scene, renderer, controls;
let geometry, material, mesh;

function initTroikaDemo() {

  const width = 400;
  const height = 400;

  camera = new PerspectiveCamera( 70, width / height, 0.01, 10 );
  
  const zoom = 1000;
  /* camera = new OrthographicCamera(
    width * -0.5 * zoom,
    width * 0.5 * zoom,
    height * 0.5 * zoom,
    height * -0.5 * zoom,
    0.01,
    10000
  ); */
  camera.position.z = 1;

	scene = new Scene();

	geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
	material = new MeshNormalMaterial();

	mesh = new Mesh( geometry, material );
  scene.add( mesh );
  scene.add(myText);

	renderer = new WebGLRenderer( { antialias: true } );
	renderer.setSize( width, height );
	document.body.appendChild( renderer.domElement );
  
  controls = new OrbitControls( camera, renderer.domElement );
	renderer.render( scene, camera );
  console.log(myText);

  animate();
}

let hasDebugged = false;

function animate() {

  if (myText._derivedMaterial.uniforms.uTroikaSDFTexture.value === null) {
    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
    return;
  }
  const image = myText._derivedMaterial.uniforms.uTroikaSDFTexture.value.image;
  if (!hasDebugged) {
    hasDebugged = true;
    console.log(myText);
    drawDataTexture(image);
  }
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
  controls.update();
  renderer.render( scene, camera );
  requestAnimationFrame( animate );

  // renderer.render( scene, camera );

  // console.log(myText._derivedMaterial.uniforms.uTroikaSDFTexture);

}

function drawDataTexture(image) {
  const idata = new ImageData(oneSDFToImage(new Uint8ClampedArray(image.data)), image.width, image.height);

  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx.putImageData(idata, 0, 0);
  document.body.appendChild(canvas);
}

export {
  initTroikaDemo,
};
