// Created by Mikołaj Zatorski c. 2021

const mergeOptions = (configFromFile, configFromCli) => ({
  ...configFromFile,
  ...configFromCli,
});

module.exports = mergeOptions;
