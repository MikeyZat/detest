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
In this section you specify the actual test suites that `detest` library should run on your web application. You start it with the `tests: ` keyword and follow with the array of test scenarios. Each of the test suites has its `type`, set of `local settings` and usually array of `test-cases` to run.

```yaml
tests:
  - name: Home page on desktop
    type: styles
    test_cases:
      - selector: ".App"
        text-align: center
        display: block
        # ...
  - name: Home page on mobile
    type: layout
    width: 375
    run: False
    test_cases:
      # ...
```

### Local settings
For each test suite you can override **any** of the [global settings](#global-settings). In addition you can specify:

#### url
You can use relative paths to create url for specific test scenario:
```yaml
url: "/pricing"
# will resolve to localhost:3000/pricing
# if global url is localhost:3000
```
#### run
You can set it to `False` in order to omit this test suite. It's useful for debugging & *tdd* approach.
```yaml
run: False
```

#### width
Browser width size (in px) that the Puppeteer will use when running this test scenario. Especially useful for testing RWD of your web application.
```yaml
width: 375
```
#### height
Browser height size (in px) that the Puppeteer will use when running this test scenario.
```yaml
height: 800
```


## Test types
For each test scenario you specify its `type`. Each of them is followed by `test_cases` where you can write your test cases using a proper API (according to the test type). Different test types are used for various purposes, so check out their descriptions below. 

```yaml
- type: styles
  test_cases:
   - selector: ".App"
     color: "#fafafa"
```

### Styles
This test type is meant to check if:
1. specific elements exist on the page
2. elements **visible styles** match design expectations 

### Layout
This test type is meant to check if:
1. specific element can be found on exact (x,y) position on the page
2. there is a correct number of specific elements on the page (or inside another element e.g. header)

## Enhanced test types
This test types allow you to automatically verify your web application design, without specifying any `test-cases`. However, their local settings API is the same as for normal test types.

### Contrast
This test type is meant to validate contrast ratio of all the text elements on the page according to WCAG2.0.

```yaml
- name: Test contrast ratio for pricing page
  type: contrast
  url: /pricing
```

## Output
...
