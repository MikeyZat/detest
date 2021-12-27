// Created by Mikołaj Zatorski c. 2021

const tap = require('tap');
const { runPuppeteerTests } = require('../common/commonPuppeteer');
const { CONTRAST } = require('../../utils/const');
const {
  shapeElementsForCalculations,
  removeTransparency,
} = require('./shapeElements');
const { logger } = require('../../utils/logger');

const runContrastTests = async (config) =>
  runPuppeteerTests(config, [CONTRAST], runContrastRatioAudit);

const runContrastRatioAudit = async (page) => {
  const elementsToValidate = await getElementsToValidate(page);
  logger.debug('Text elements to validate contrast ratio:');
  logger.debug(elementsToValidate);
  const withCorrectBackgrounds = await removeTransparency(
    elementsToValidate,
    page
  );
  const shapedElements = shapeElementsForCalculations(withCorrectBackgrounds);
  await tap.test(
    `[CONTRAST SERVICE]: Running contrast ratio audit`,
    async (t) => {
      for (let element of shapedElements) {
        const contrastRatio = contrast(element.colorRgb, element.backgroundRgb);
        const { text } = element;
        logger.debug(`Contrast ratio for element ${text}: ${contrastRatio}`);
        const threshold = element.isLargeText ? 3.0 : 4.5;
        t.ok(
          contrastRatio > threshold,
          `check if "${text}" ${
            element.isLargeText ? '(large text)' : ''
          } has contrast ratio > ${threshold}`
        );
      }
      t.end();
    }
  );
};

const getElementsToValidate = async (page) => {
  const accessibilityTree = await page.accessibility.snapshot();
  const pageTexts = accessibilityTree.children.map((item) => item.name);
  return page.evaluate(
    (texts) =>
      // eslint-disable-next-line
      Array.from(document.body.querySelectorAll('*'))
        .filter((element) => texts.includes(element.innerText))
        // leave only unique elements closest to text
        .reverse()
        .filter(
          (element, idx, self) =>
            idx === self.findIndex((e) => e.innerText === element.innerText)
        )
        .reverse()
        .map((element) => {
          // eslint-disable-next-line
          const elementStyles = window.getComputedStyle(element);
          const shapedStyles = {};
          for (let property of [
            'color',
            'background-color',
            'font-size',
            'font-weight',
          ]) {
            shapedStyles[property] = elementStyles.getPropertyValue(property);
          }
          return {
            text: element.innerText,
            ...shapedStyles,
          };
        }),
    pageTexts
  );
};

const luminance = (rgb) => {
  const a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrast = (rgb1, rgb2) => {
  const lum1 = luminance(rgb1);
  const lum2 = luminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

module.exports = {
  runContrastTests,
};
