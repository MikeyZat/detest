# Welcome to de-test docs

Here you can learn how to get 100% of the **detest** library power. Check out the API including all the test types. For a live example visit [detest example](https://github.com/MikeyZat/detest-example).


## Table of contents

  * [API format](#api-format)
  * [Global settings](#global-settings)
      - [name](#name)
      - [url](#url)
      - [debug](#debug)
      - [timeout](#timeout)
  * [CLI](#cli)
  * [Test cases](#test-cases)
    + [Local settings](#local-settings)
  * [Test types](#test-types)
    + [Styles](#styles)
    + [Layout](#layout)
  * [Enhanced test types](#enhanced-test-types)
    + [Contrast](#contrast)
  * [Output](#output)

## API format

All the tests options are configured using a `yaml` format (usually in a `detest.yaml` file). It should be easy to read for anyone but if you need more guidance, check out [YAML tutorial](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started).


## Global settings

These settings have effect on all test scenarios. You can always override them using [CLI](#cli) or [local settings](#local-settings).

#### name
You can specify name for all test cases. This is for display/organization purpose only and will be shown in test output.
```yaml
name: Design testing of local app
```
#### url
You must specify the tested web application starting point. This is required for detest to work correctly.
```yaml
url: localhost:3000
# or
url: https://www.youtube.com
```
#### debug
You can turn on this flag in order to see the debug logs which might help you find out the reason for tests failure.
```yaml
debug: True
```
#### timeout
You can specify the timeout (in milliseconds) for puppeteer methods. Defaults to `15000ms`.
```yaml
timeout: 5000
```
## CLI

Using Command Line Interface you can set (or override) any of the global settings options:
```bash
detest -u localhost:3000 --debug
```
Additionally, you specify the detest configuration file name (defaults to `detest.yaml`):
```bash
detest -c another-set-of-tests.yaml
```
If you need more information, use the `-h` or `--help` option:
```bash
detest -h
```
## Test cases
...

### Local settings
...

## Test types
...

### Styles
...

### Layout
...

## Enhanced test types
...

### Contrast
...

## Output
...
