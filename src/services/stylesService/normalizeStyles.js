// Created by Mikołaj Zatorski c. 2021

const normalizeStyles = (rawStyles) =>
  Object.keys(rawStyles).reduce((shapedStyles, property) => {
    const value = rawStyles[property];

    if (pixelsProperties.includes(property)) {
      shapedStyles[property] = valueToPixels(value);
      return shapedStyles;
    }

    if (colorProperties.includes(property)) {
      shapedStyles[property] = colorToRGB(value);
      return shapedStyles;
    }

    shapedStyles[property] = value;
    return shapedStyles;
  }, {});

const valueToPixels = (value) => {
  if (!isNaN(Number(value))) {
    const stringValue = String(value);
    return `${stringValue}px`;
  }
  return value;
};

const colorToRGB = (color) => {
  if (color === 'white') return 'rgb(255, 255, 255)';
  if (color === 'black') return 'rgb(0, 0, 0)';
  if (color.includes('#')) {
    const colorToParse = color.length === 7 ? color : extendHex(color);
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const rgbRegex = regex.exec(colorToParse);
    const rgb = rgbRegex.slice(1, 4).map((hex) => String(parseInt(hex, 16)));
    return `rgb(${rgb.join(', ')})`;
  }
  if (color.includes('RGB') || color.includes('rgb')) {
    const rgb = color.replace(/[^\d,]/g, '').split(',');
    return `rgb(${rgb.join(', ')})`;
  }

  return color;
};

const extendHex = (val) =>
  `${val[0]}${[...val.substr(1)].map((char) => char.repeat(2)).join('')}`;

module.exports = normalizeStyles;

const pixelsProperties = [
  'height',
  'min-height',
  'max-height',
  'width',
  'max-width',
  'min-width',
  'block-size',
  'min-block-size',
  'border-radius',
  'border-width',
  'cx',
  'cy',
  'font-size',
  'inline-size',
  'margin',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin-bottom',
  'padding',
  'padding-top',
  'padding-bottom',
  'padding-right',
  'padding-left',
  'padding-block',
  'padding-block-end',
  'base-line-shift',
  'border-width',
  'border-top-width',
  'border-bottom-width',
  'border-right-width',
  'border-left-width',
  'stroke-width',
  'text-indent',
  'x',
  'y',
  'word-spacing',
  'top',
  'bottom',
  'right',
  'left',
];

const colorProperties = [
  'background-color',
  'border-block-color',
  'border-color',
  'border-bottom-color',
  'border-top-color',
  'border-left-color',
  'border-right-color',
  'border-inline-color',
  'caret-color',
  'color',
  'column-rule-color',
  'fill',
  'flood-color',
  'lighting-color',
  'outline-color',
  'stop-color',
  'text-decoration-color',
];
