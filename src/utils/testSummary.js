// Created by Mikołaj Zatorski c. 2021
/* eslint-disable no-console */

const tap = require('tap');

const logSeparator = () => {
  console.log('\n');
  console.log('-'.repeat(100));
  console.log('\n');
};

const testSummary = () => {
  logSeparator();
  console.log('TESTS SUMMARY\n');
  console.log('TOTAL TEST CASES RUN:');
  console.log(tap.counts.total);
  console.log('TOTAL TEST CASES PASSED:');
  console.log(tap.counts.pass);
  console.log('TOTAL TEST CASES FAILED:');
  console.log(tap.counts.fail);
  console.log('SUCCESS RATIO');
  console.log(
    `${((100 * tap.counts.pass) / (tap.counts.total || 1)).toFixed(2)}%`
  );
  logSeparator();
};

module.exports = testSummary;
