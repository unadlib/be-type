# be-type
be-type is based on ECMAScript2015+ proxy feature

[![Travis](https://img.shields.io/travis/unadlib/be-type.svg)](https://travis-ci.org/unadlib/be-type)
[![Coverage Status](https://coveralls.io/repos/github/unadlib/be-type/badge.svg?branch=master)](https://coveralls.io/github/unadlib/be-type?branch=master)
[![npm](https://img.shields.io/npm/v/be-type.svg)](https://www.npmjs.com/package/be-type)
[![npm](https://img.shields.io/npm/dt/be-type.svg)](https://www.npmjs.com/package/be-type)
[![npm](https://img.shields.io/npm/l/be-type.svg)](https://www.npmjs.com/package/be-type)

### Usage
```bash
yarn add be-type
npm install --save be-type
```
JavaScript:
```javascript
import be from 'be-type';
be.function(()=>{}); // true
```
Custom type check:
```javascript
//be.js
import be,{setBe} from 'be-type';
export default setBe({
    Negative:(value)=> be.Number(negative) && negative < 0
})
//other.js
import be from '../be.js';
be.Negative(-1); // true
```

### API

#### Interface Rule:

1. If the first letter of the API is **lowercase**, then it refers to toString.call(value), the type returned by call.

> be.function(()=>{}) `equivalent` toString.call(()=>{}) ==== "[object Function]"

> be.generatorFunction(function* (){}) `equivalent` toString.call(function* (){}) ==== "[object GeneratorFunction]"

> be.uint8Array(new Uint8Array()) `equivalent` toString.call(new Uint8Array()) ==== "[object Uint8Array]"
> etc..

2. if the first letter of the API is **uppercase**, it means not toString.call(value), Custom type returned by call

#### Default built-in type check:

| Interface     |    Spec |
| :------------ | --------------:|
| Function      |  plain function |
| Object        |  plain object |
| String        |  basic string |
| Number        |  basic number |
| Boolean       |  basic boolean |
| NaN           |  strict equality to `NaN`|
| Nil           |  `null` or `null` |
| Empty         |  none length |
| Infinity      |  strict equality to `Infinity`|
| Finite        |  basic number and not `NaN` or `Infinity` |
| Native        |  pristine native function  |
| SafeInteger   |  based on Number.isSafeInteger  |
| Integer       |  based on Number.isInteger  |
| Element       |  HTML Element |
