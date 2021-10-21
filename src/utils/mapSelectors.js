const carbon = require('./maps/carbon');
const ant = require('./maps/ant');
const bootstrap = require('./maps/bootstrap');
const material = require('./maps/material');

const frameworksMap = {
  carbon,
  'carbon-react': carbon,
  ant,
  antd: ant,
  'ant-design': ant,
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
      obj[key] = mapSelectors(obj[key], selectorsMap);
    }
  });

  const { selector } = obj;

  if (typeof selector !== 'string') return obj;
  return {
    ...obj,
    selector: selectorsMap[selector.toLowerCase()] || selector,
  };
};

module.exports = mapSelectors;
