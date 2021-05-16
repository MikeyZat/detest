// Created by Mikołaj Zatorski c. 2021

const TESTS_EXAMPLE = `
tests:
  - name: First set of tests
    type: styles
    debug: True
    test_cases:
      - xpath: '#testxpath'
        border: '1px solid #ffffff'
        width: 40
        height: 40
        color: red
      - xpath: '#anotherxpath'
        background-color: $000000

  - name: Second set of tests
    type: styles
    url: https://www.youtube.com/
    run: False
    test_cases:
      - xpath: '#testxpath'
        background-color: $000000
`;

module.exports = {
  TESTS_EXAMPLE,
};
