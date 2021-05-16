#!/usr/bin/env node

const yargs = require('yargs');
const main = require('./index');

const builder = (command) =>
  command
    .option('configFile', {
      describe: 'Path to the detest config file',
      type: 'string',
      default: 'detest.conf',
      alias: 'c',
    })
    .options({});

const handler = ({ configFile, ...rest }) => main(configFile, rest);

yargs
  .command('*', 'Elo', builder, handler)
  .usage('Usage: $0 [configFile] [options...]')
  .example('$0 -c localTests.conf', 'Run local tests')
  .help()
  .alias('h', 'help')
  .alias('v', 'version')
  .epilogue('For more information, visit https://github.com/MikeyZat/detest')
  .wrap(90)
  .parse();
