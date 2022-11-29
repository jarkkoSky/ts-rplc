[![CI](https://github.com/jarkkoSky/ts-rplc/actions/workflows/ci.yml/badge.svg)](https://github.com/jarkkoSky/ts-rplc/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/jarkkoSky/ts-rplc/branch/master/graph/badge.svg?token=OL4MLK8WK6)](https://codecov.io/gh/jarkkoSky/ts-rplc)

# TS-RPLC

ts-rplc is a utility tool to replace properties in an object.
The catch is that this tool replaces properties anywhere in the object. It can handle complex structure including arrays etc. <b>TL;DR replace property anywhere in an object</b>

## Motivation

Motivation for creating this tool came from the need to sometimes make test data deterministic. Rather than always write a sketchy solution to this trivial task, I implemented a simple package utilizing fp-ts

## Install

`npm install ts-rplc --save`

## Usage

<b>All exported functions are curried</b>

### replaceProperty

```javascript
import { replaceProperty } from 'ts-rplc';

const obj = {
  test: 123,
};

const result = replaceProperty('test')('NewValue')(obj);
```

## Future tasks

- Implement replaceDate to replace any date value in an object with a desired value
- Add automated publish when version number bumped
