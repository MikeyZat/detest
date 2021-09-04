const { pxToNumber } = require('../stylesService/normalizeStyles');

const shapeElementsForCalculations = (elements) => {
  const shapedElements = elements.map((element) => {
    const { text, ...rawStyles } = element;
    const fontSize = pxToNumber(rawStyles['font-size']);
    const fontWeight = Number(rawStyles['font-weight']);
    const isLargeText =
      fontSize > 24 || (fontSize > 18.66 && fontWeight >= 500);
    const { 'background-color': bgColor, color } = rawStyles;

    const colorRgba = textToRgbaArray(color);

    const backgroundRgb = textToRgbaArray(
      bgColor === 'rgba(0, 0, 0, 0)' ? 'rgb(255,255,255)' : bgColor
    );

    const colorRgb =
      colorRgba.length === 4 ? rgba2rgb(backgroundRgb, colorRgba) : colorRgba;

    return {
      text,
      isLargeText,
      colorRgb,
      backgroundRgb,
    };
  });

  return shapedElements;
};

module.exports = shapeElementsForCalculations;

const textToRgbaArray = (text) =>
  text
    .replace(/[^\d,]/g, '')
    .split(',')
    .map(Number);

const rgba2rgb = (RGB_background, RGBA_color) => {
  const alpha = RGBA_color[3] / 100;

  return [
    (1 - alpha) * RGB_background[0] + alpha * RGBA_color[0],
    (1 - alpha) * RGB_background[1] + alpha * RGBA_color[1],
    (1 - alpha) * RGB_background[2] + alpha * RGBA_color[2],
  ];
};
