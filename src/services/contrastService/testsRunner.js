// Created by Mikołaj Zatorski c. 2021

const { runPuppeteerTests } = require('../common/commonPuppeteer');
const { CONTRAST } = require('../../utils/const');

const runContrastTests = async (config) =>
  runPuppeteerTests(config, [CONTRAST], runContrastRatioAudit);

const runContrastRatioAudit = async (page) => {
  const elementsToValidate = await getElementsToValidate(page);
  console.log(elementsToValidate);
  // shape for calculations
  // calculate
  // asert
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
          return {
            text: element.innerText,
            color: elementStyles.getPropertyValue('color'),
            background: elementStyles.getPropertyValue('background-color'),
            fontSize: elementStyles.getPropertyValue('font-size'),
            fontWeight: elementStyles.getPropertyValue('font-weight'),
          };
        }),
    pageTexts
  );
};

module.exports = {
  runContrastTests,
};
