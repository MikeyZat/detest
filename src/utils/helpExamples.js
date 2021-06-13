// Created by Mikołaj Zatorski c. 2021

const TESTS_EXAMPLE = `
tests:
  - name: First set of tests
    type: styles
    debug: True
    test_cases:
      - selector: '#testselector"
        border: '1px solid #ffffff'
        width: 40
        height: 40
        color: rgb(0,0,0,0.87)
      - xpath: "someXPath"
        background-color: white

  - name: Second set of tests
    type: styles
    url: https://www.youtube.com/
    run: False
    test_cases:
      - selector: "#testxpath"
        background-color: "#000000"
`;

module.exports = {
  TESTS_EXAMPLE,
};
