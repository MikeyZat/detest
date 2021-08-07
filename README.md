<!-- <p align="center">
  <img src="./demo.gif"/>
</p> -->
<h1 align="center">
  de-test
</h1>
<h2 align="center">
  Complex design testing in a very simple way
</h2>

> This tool allows you to test you web application design in a very simple way. Complete your end-to-end testing by writing multiple test cases in detest.yaml file. No programming knowledge required!

[![Generic badge](https://img.shields.io/badge/Build%20with-Node-darkgreen.svg)](https://shields.io/)
![Build](https://github.com/MikeyZat/in-design-reviewer/actions/workflows/test.yaml/badge.svg)
<a href="https://www.npmjs.com/package/@mikeyzat12/detest">
  <img src="https://img.shields.io/npm/v/@mikeyzat12/detest.svg" />
</a>
## How to use

### Instalation

In your project directory simply run: \
`npm install --save-dev @mikeyzat12/detest`


### Configuration file

In your project root directory (where you have `package.json` file) create a `detest.yaml` file.

### Writing test case suites

To see the configuration file API and detailed guide how to write test cases, check out [how to use docs](./docs/how-to-use.md).

### Running detest

Firstly, add a `detest` script to your `package.json` file:

```json
{
  "scripts": {
    "detest": "detest"
  }
}
```

Then, you can evaluate your tests from the command line like: \
`npm run detest`.

It will run de-test tests with configuration from `detest.yaml` file by default. Nonetheless, you can easily choose another config file or use many other cli options ([more info here](./docs/how-to-use.md#cli-options)).

## Examples

Check out the [Example React application project](https://github.com/MikeyZat/detest-example) for a complex example, including integrating the **de-test** into CI pipeline.

## How it works

## Motivation

### Why?
The market lacks tools for testing the **design** of web applications.
The design testing is usually done manually and requires a lot of developers, designers and testers attention and effort.

### The main goal
The aim of this project is to allow web developers and web designers to cover their application with end-to-end design tests.
I'd like to enhance design testing of web applications by creating a library which supports multiple types of such tests and can be easily used by developers or even designers with no programming knowledge.

## Authors

<table>
  <tr>
    <td align="center"><a href="https://github.com/MikeyZat"><img src="https://avatars0.githubusercontent.com/u/41756225?s=460&u=a8048220c6af35242049df4c497a8a7a759840bc&v=4" width="100px;" alt=""/><br /><sub><b>Mikołaj Zatorski</b></sub></a></td>
</table
