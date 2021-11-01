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
  return testCases.map((testCase) => mapSelector(testCase, selectorsMap));
};

const mapSelector = (obj, selectorsMap) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      obj[key] = mapSelector(obj[key], selectorsMap);
    }
  });

  const { selector } = obj;

  if (typeof selector !== 'string') return obj;
  return {
    ...obj,
    selector: selectorsMap[selector] || selector,
  };
};

module.exports = mapSelectors;
