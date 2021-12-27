const runTestCases = async (runTestFn, page, testCases) => {
  for (let testCase of testCases) {
    await runTestFn(page, testCase);
  }
};

const runNestedTestCases = async (
  runTestFn,
  page,
  testCases,
  selector,
  xpath
) => {
  if (!Array.isArray(testCases)) return;
  for (const testCase of testCases) {
    let nestedSelector, nestedXpath;
    const {
      isDirectChild,
      selector: testCaseSelector,
      xpath: testCaseXpath,
      ...restTestCase
    } = testCase;
    if (selector && testCaseSelector) {
      if (isDirectChild) {
        nestedSelector = `${selector} > ${testCaseSelector}`;
      } else {
        nestedSelector = `${selector} ${testCaseSelector}`;
      }
    } else if (xpath && testCaseXpath) {
      if (isDirectChild) {
        nestedXpath = `${xpath}/${testCaseXpath}`;
      } else {
        nestedXpath = `${xpath}//${testCaseXpath}`;
      }
    } else {
      throw new Error(
        'Invalid nested selector - parent and child should both have either selector or xpath specified.'
      );
    }

    await runTestFn(page, {
      ...restTestCase,
      selector: nestedSelector,
      xpath: nestedXpath,
    });
  }
};

module.exports = {
  runTestCases,
  runNestedTestCases,
};
