// Created by Mikołaj Zatorski c. 2021

const tap = require('tap');
const { runPuppeteerTests } = require('../common/commonPuppeteer');
const { logger } = require('../../utils/logger');
const {
  runTestCases: genericRunTestCases,
  runNestedTestCases: genericRunNestedTestCases,
} = require('../common/genericTestsRunners');
const mapSelectors = require('../../utils/mapSelectors');

const runLayoutTests = async (config, testCases) =>
  await runPuppeteerTests(
    config,
    mapSelectors(testCases, config.UI_framework),
    runTestCases
  );

const runTestCases = (...args) => genericRunTestCases(runTestCase, ...args);

const runNestedTestCases = (...args) =>
  genericRunNestedTestCases(runTestCase, ...args);

const runTestCase = async (page, testCase) => {
  const { selector, xpath, inside: nestedTestCases, ...tests } = testCase;
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
        const { x, y } = position;
        if (typeof x !== 'number' || x < 0 || typeof y !== 'number' || y < 0) {
          t.fail('Either x or y value is not a valid number');
        } else {
          const {
            x: actualX,
            y: actualY,
            width,
            height,
          } = await element.boundingBox();
          const offsetX = x - actualX;
          const offsetY = y - actualY;
          const isInside =
            offsetX >= 0 &&
            offsetX <= width &&
            offsetY >= 0 &&
            offsetY <= height;
          tap.ok(
            isInside,
            `check if element ${locator} is visible at (x,y) = (${x}, ${y}).`
          );
        }
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

  await runNestedTestCases(page, nestedTestCases, selector, xpath);
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
