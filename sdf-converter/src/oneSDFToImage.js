function oneSDFToImage(sdfArray) {
  const output = new Uint8ClampedArray(sdfArray.length * 4);
  sdfArray.forEach((value, id) => {
    output[4 * id + 0] = value;
    output[4 * id + 1] = value;
    output[4 * id + 2] = value;
    output[4 * id + 3] = 255;
  });
  return output;
}

export {
  oneSDFToImage,
};
