// Created by Mikołaj Zatorski c. 2021

const tap = require('tap');
const { runPuppeteerTests } = require('../common/commonPuppeteer');
const { logger } = require('../../utils/logger');

const runLayoutTests = async (config, testCases) =>
  await runPuppeteerTests(config, testCases, runTestCases);

const runTestCases = async (page, testCases) => {
  for (let testCase of testCases) {
    await runTestCase(page, testCase);
  }
};

const runTestCase = async (page, testCase) => {
  const { selector, xpath, ...tests } = testCase;
  const { position, contains: containCases } = tests;
  const locator = selector || xpath;

  await tap.test(
    `[LAYOUT SERVICE]: Checking element: ${locator}`,
    async (t) => {
      let element;
      try {
        element = await getElement(page, locator, !!selector);
      } catch (err) {
        logger.trace(err);
        element = null;
      }

      if (!element) {
        t.fail(`Element: ${locator} doesn't exist`);
        t.end();
        return;
      }

      if (position) {
        // check if element is available at this position
        const { x, y } = position;
        console.log(`x: ${x}y: 1${y}`);
        // t.same() or t.ok()
      }

      if (containCases) {
        for (let elementToFind of containCases) {
          const {
            selector: childSelector,
            xpath: childXpath,
            count = 1,
          } = elementToFind;
          const childLocator = childSelector || childXpath;
          try {
            const multiple = true;
            const foundChildElements = await getElement(
              element,
              childLocator,
              !!childSelector,
              multiple
            );
            const actualCount = foundChildElements?.length;
            t.same(
              actualCount,
              count,
              `check if element ${childLocator} appears ${count} times within element ${locator}`
            );
          } catch (err) {
            logger.trace(err);
            t.fail(`Element: ${childLocator} doesn't exist within ${locator}`);
          }
        }
      }
      t.end();
    }
  );
};

const getElement = async (
  parentElement,
  elementSelector,
  isSelector,
  multiple = false
) =>
  isSelector
    ? await getElementWithSelector(parentElement, elementSelector, multiple)
    : await getElementWithxPath(parentElement, elementSelector, multiple);

const getElementWithSelector = async (parentElement, selector, multiple) =>
  multiple ? await parentElement.$$(selector) : await parentElement.$(selector);

const getElementWithxPath = async (parentElement, xPath, multiple) => {
  const nodeHandle = await parentElement.$x(xPath);
  if (multiple) {
    return nodeHandle;
  }
  return nodeHandle[0];
};

module.exports = {
  runLayoutTests,
};
