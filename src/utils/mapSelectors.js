const bootstrap = require('./maps/bootstrap');
const material = require('./maps/material');

const frameworksMap = {
  bootstrap,
  material,
  materialui: material,
  'material-ui': material,
};

const mapSelectors = (testCases, UI_framework) => {
  if (typeof UI_framework !== 'string') return testCases;
  const selectorsMap = frameworksMap[UI_framework.toLowerCase()];
  const selectorsList = getSelectorsList(selectorsMap);
  return testCases.map((testCase) =>
    mapSelector(testCase, { selectorsMap, selectorsList })
  );
};

const mapSelector = (obj, mappers) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      obj[key] = mapSelector(obj[key], mappers);
    }
  });

  const { selector } = obj;

  if (typeof selector !== 'string') return obj;
  return {
    ...obj,
    selector: getMappedSelector(selector, mappers),
  };
};

const getSelectorsList = (selectorsMap) => {
  const selectorsList = Object.keys(selectorsMap);
  selectorsList.sort((a, b) => b.length - a.length);
  return selectorsList;
};

const getMappedSelector = (selector, { selectorsMap, selectorsList }) =>
  selectorsList.reduce(
    (prevSelector, currKey) =>
      prevSelector.replaceAll(currKey, selectorsMap[currKey]),
    selector
  );

module.exports = mapSelectors;
