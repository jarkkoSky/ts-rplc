[![Test](https://github.com/jarkkoSky/ts-rplc/actions/workflows/test.yml/badge.svg)](https://github.com/jarkkoSky/ts-rplc/actions/workflows/test.yml)

# TS-RPLC

ts-rplc is a utility tool to replace properties in an object.
The catch is that this tool replaces properties anywhere in the object. It can handle complex structure including arrays etc. <b>TL;DR replace property anywhere in an object</b>

## Motivation

Motivation for creating this tool came from the need to sometimes make test data deterministic. Rather than always write a sketchy solution to this trivial task, I implemented a simple package with no dependencies.

## Install

`npm install ts-rplc`

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
