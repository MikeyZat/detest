#!/usr/bin/env node
// Created by Mikołaj Zatorski c. 2021

const yargs = require('yargs');
const main = require('./index');

const builder = (command) =>
  command
    .option('configFile', {
      describe: 'Path to the detest config file',
      type: 'string',
      default: 'detest.yaml',
      alias: 'c',
    })
    .options({
      debug: {
        describe: 'Run in a debug mode',
        type: 'boolean',
        alias: 'd',
      },
      url: {
        describe: 'Entrypoint of the web application',
        type: 'string',
        alias: 'u',
      },
      name: {
        describe: 'Name of the tests (visible in output)',
        type: 'string',
        alias: 'n',
      },
      timeout: {
        describe: 'Timeout for puppeteer setDefaultTimeout',
        type: 'number',
        alias: 't',
      },
      UI_framework: {
        describe: 'UI framework used to build the web application',
        type: 'string',
        alias: 'f',
      },
    });

const extractOptions = (options) => {
  const { url, debug, name, timeout, UI_framework } = options;
  return { url, debug, name, timeout, UI_framework };
};

const handler = ({ configFile, ...rest }) =>
  main(configFile, extractOptions(rest));

yargs
  .command('*', 'Run detest', builder, handler)
  .usage('Usage: $0 [configFile] [options...]')
  .example('$0 -c localTests.conf', 'Run local tests')
  .help()
  .alias('h', 'help')
  .alias('v', 'version')
  .epilogue('For more information, visit https://github.com/MikeyZat/detest')
  .wrap(90)
  .parse();
