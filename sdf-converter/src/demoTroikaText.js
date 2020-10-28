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

const toChesterKallman =
`Every eye must weep alone
Till I Will be overthrown.
But I Will can be removed,
Not having sense enough
To guard against I Know,
But I will can be removed.
Then all I's can meet and grow,
I Am become I Love,
I Have Not I Am Loved,
Then all I's can meet and grow.
Till I Will be overthrown
Every eye must weep alone.`;

const sentences = toChesterKallman.split('\n');
console.log(sentences);

let sentenceId = 0;

const myText = new Text();
setText(sentences[0]);

function setText(text) {
  // Set properties to configure:
  myText.text = text;
  myText.debugSDF = true;
  myText.textAlign = 'center';
  myText.anchorX = 'center';
  myText.anchorY = 'middle';
  myText.fontSize = 0.2;
  myText.position.z = -2;
  myText.color = 0xFFFFFF;

  // Update the rendering:
  myText.sync();
}

let camera, scene, renderer, controls;
let geometry, material, mesh;
let zoom = 1.8;

const width = 1280;
const height = 720;

const ratio = width / height;

function initTroikaDemo() {

  camera = new PerspectiveCamera( 70, width / height, 0.01, 10 );
  
  camera = new OrthographicCamera(
    ratio * -0.5 * zoom,
    ratio * 0.5 * zoom,
    1 * 0.5 * zoom,
    1 * -0.5 * zoom,
    0.01,
    10000
  );
  camera.position.z = 1;

	scene = new Scene();

	geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
	material = new MeshNormalMaterial();

	mesh = new Mesh( geometry, material );
  // scene.add( mesh );
  scene.add(myText);

	renderer = new WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
	renderer.setSize( width, height );
	document.body.appendChild( renderer.domElement );
  
  controls = new OrbitControls( camera, renderer.domElement );
	renderer.render( scene, camera );
  console.log(myText);

  animate();
}

let hasDraw = false;
let time = 0;
const timeDebug = document.createElement('div');
timeDebug.innerText = time;
document.body.appendChild( timeDebug );
function animate() {

  if (myText._derivedMaterial === undefined || myText._derivedMaterial.uniforms.uTroikaSDFTexture.value === null) {
    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
    return;
  }
  const image = myText._derivedMaterial.uniforms.uTroikaSDFTexture.value.image;
  if (!hasDraw) {
    saveFrame();
    console.log(myText._derivedMaterial.uniforms.uTroikaSDFTexture.value.uuid);
    hasDraw = true;
    drawDataTexture(image);
    myText.addEventListener('synccomplete', () => {
      // code to execute after sync completes...
      /* const image = myText._derivedMaterial.uniforms.uTroikaSDFTexture.value.image;
      drawDataTexture(image); */
      renderer.render( scene, camera );
      saveFrame();
      setText(sentences[Math.min(++sentenceId, sentences.length-1)]);
    });
    setText(sentences[++sentenceId % sentences.length]);
  }
  // requestAnimationFrame( animate );
	/* mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
  controls.update();
  renderer.render( scene, camera );
  requestAnimationFrame( animate ); */

  // camera.zoom = Math.sin(time) * 1000;
  time += 0.005;
  timeDebug.innerText = Math.sin(time);
  // renderer.render( scene, camera );

  // console.log(myText._derivedMaterial.uniforms.uTroikaSDFTexture);

}

function saveFrame() {
  const dataUrl = renderer.domElement.toDataURL("image/png");
  const imageDownload = document.createElement('a');
  imageDownload.href = dataUrl;
  imageDownload.download = String(sentenceId).padStart(3, '0') + '_' + sentences[sentenceId].replace(/ /g, '-').replace('?', '') + '.png'
  // imageDownload.click();
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
