const { pxToNumber } = require('../stylesService/normalizeStyles');
const { TRANSPARENT } = require('../../utils/const');

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
      bgColor === TRANSPARENT ? 'rgb(255,255,255)' : bgColor
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

const removeTransparency = async (elements, page) => {
  const transparentElementsText = elements
    .filter((node) => node['background-color'] === TRANSPARENT)
    .map((node) => node.text);

  const nonTransparentBackgrounds = await page.evaluate(
    (transparentElementsText, TRANSPARENT) =>
      // eslint-disable-next-line
      Array.from(document.body.querySelectorAll('*'))
        .filter((element) =>
          transparentElementsText.some((text) =>
            element.innerText?.includes(text)
          )
        )
        .map((element) => {
          // eslint-disable-next-line
          const elementStyles = window.getComputedStyle(element);
          return {
            text: element.innerText,
            background: elementStyles.getPropertyValue('background-color'),
          };
        })
        .filter((node) => node.background !== TRANSPARENT)
        .reverse(),
    transparentElementsText,
    TRANSPARENT
  );
  return elements.map((node) => {
    if (node['background-color'] !== TRANSPARENT) return node;
    return {
      ...node,
      'background-color': findBackground(node, nonTransparentBackgrounds),
    };
  });
};

const findBackground = (element, nonTransparentBackgrounds) => {
  const { text } = element;
  return (
    nonTransparentBackgrounds.find((bgNode) => bgNode.text.includes(text))
      ?.background || 'rgb(255,255,255)'
  );
};

module.exports = {
  shapeElementsForCalculations,
  removeTransparency,
};

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
