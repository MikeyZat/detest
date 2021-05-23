// Created by Mikołaj Zatorski c. 2021

const mergeOptions = (configFromFile, configFromCli) => ({
  ...configFromFile,
  name: configFromCli.name || configFromFile.name,
  url: configFromCli.url || configFromFile.url,
  debug:
    configFromCli.debug !== undefined
      ? configFromCli.debug
      : configFromFile.debug,
  timeout: configFromCli.timeout || configFromFile.timeout,
});

module.exports = mergeOptions;
