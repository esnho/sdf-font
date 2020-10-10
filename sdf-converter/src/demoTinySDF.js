import TinySDF from '@mapbox/tiny-sdf';
import { oneSDFToImage } from './oneSDFToImage';

function demoTinySDF() {
  const fontsize = 24; // Font size in pixels
  const buffer = 3;    // Whitespace buffer around a glyph in pixels
  const radius = 8;    // How many pixels around the glyph shape to use for encoding distance
  const cutoff = 0.25  // How much of the radius (relative) is used for the inside part the glyph
   
  const fontFamily = 'sans-serif'; // css font-family
  const fontWeight = 'normal';     // css font-weight
  const tinySDFGenerator = new TinySDF(fontsize, buffer, radius, cutoff, fontFamily, fontWeight);
   
  const oneSDF = tinySDFGenerator.draw('泽');
  // returns a Uint8ClampedArray array of alpha values (0–255) for a size x size square grid
  
  // create imageData
  const idata = new ImageData(oneSDFToImage(oneSDF), tinySDFGenerator.size, tinySDFGenerator.size);
  
  // draw generated SDF on screen
  const canvas = document.createElement('canvas');
  canvas.width = tinySDFGenerator.size;
  canvas.height = tinySDFGenerator.size;
  const ctx = canvas.getContext("2d");
  ctx.putImageData(idata, 0, 0);
  document.body.appendChild(canvas);
}

export {
  demoTinySDF,
};
