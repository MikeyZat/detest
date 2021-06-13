// Created by Mikołaj Zatorski c. 2021
/* eslint-disable no-console */

const tap = require('tap');

const setExitCode = () => {
  process.on('exit', (code) => {
    if (tap.counts.total === 0) {
      console.log('No test cases run :(');
      console.log('Exiting with status code 1');
      process.exitCode = 1;
    }
  });
};

module.exports = setExitCode;
