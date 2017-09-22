import be,{setBe} from '../lib'

const _be = setBe({
  test: (value) => value === 1000
})
const testCase = {
  '""': 'string',
  '3.14': 'number',
  '-1': 'number',
  'true': 'boolean',
  'false': 'boolean',
  'function() {}': 'function',
  'class Test{}': 'function',
  '[]': 'array',
  '{}': 'object',
  'null': 'null',
  'undefined': 'undefined',
  'Symbol()': 'symbol',
  'new Set()': 'set',
  'new WeakSet()': 'weakSet',
  'new Map()': 'map',
  'new WeakMap()': 'weakMap',
  'new Promise(r=>r())': 'promise',
  '(async ()=>{})': 'asyncFunction',
  'new ArrayBuffer()': 'arrayBuffer',
  'function* (){}': 'generatorFunction',
  'new Date()': 'date',
  'new RegExp()': 'regExp',
  '/\\1/': 'regExp',
  'new Uint8Array()': 'uint8Array',
  'new Error("test")': 'error',
}

Object.entries(testCase).forEach(([_case, _type]) => {
  test(`be ${_case} type is ${_type}`, () => {
    expect(be[_type](
      Function(`return ${_case}`)()
    )).toEqual(true)
  })
  Object.entries(testCase).forEach(([__case, __type]) => {
    if (__case === _case || __type === _type) { return }
    test(`be ${__case} type isn't ${_type}`, () => {
      expect(be[_type](
        Function(`return ${__case}`)()
      )).toEqual(false)
    })
  })
})

test(`be Arguments type is arguments`, () => {
  new function(){
    expect(be.arguments(
      arguments
    )).toEqual(true)
  }
})

Object.entries(testCase).forEach(([__case, __type]) => {
  test(`be ${__case} type isn't arguments`, () => {
    expect(be.arguments(
      Function(`return ${__case}`)()
    )).toEqual(false)
  })
})

const enumCase = [
  {
    equal: true,
    cases: [
      ['NaN','NaN'],
      ['Nil','null'],
      ['Nil','undefined'],
      ['Boolean','true'],
      ['Boolean','false'],
      ['String','"test"'],
      ['Number','0'],
      ['Number','1'],
      ['Empty','""'],
      ['Empty','0'],
      ['Empty','[]'],
      ['Empty','{}'],
      ['Empty','function(){}'],
      ['Empty','null'],
      ['Empty','undefined'],
      ['Empty','false'],
      ['Empty','true'],
      ['Empty','new Boolean(false)'],
      ['Empty','new Boolean(true)'],
      ['Empty','function* (){}'],
      ['Infinity','Infinity'],
      ['Finite','100'],
      ['Native','Object.assign'],
      ['SafeInteger','9007199254740991'],
      ['SafeInteger','-9007199254740991'],
      ['Integer','10'],
      ['Integer','9007199254740991'],
    ],
  },
  {
    equal: false,
    cases: [
      ['NaN','undefined'],
      ['NaN','null'],
      ['Nil','NaN'],
      ['Boolean','new Boolean(false)'],
      ['Boolean','new Boolean(true)'],
      ['String','new String("test")'],
      ['Number','new Number(1)'],
      ['Number','new Number(0)'],
      ['Infinity','10'],
      ['Finite','Infinity'],
      ['Finite','NaN'],
      ['SafeInteger','9007199254740992'],
      ['SafeInteger','-9007199254740992'],
      ['Integer','10e500'],
      ['Integer','-10.10'],
      ['Element','{nodeType:1}'],
    ],
  }
]

enumCase.forEach(({equal,cases})=>{
  cases.forEach(([type,value])=>{
    test(`be ${value} type is${equal?'':'n\'t'} ${type}`, () => {
      expect(be[type](
        Function(`return ${value}`)()
      )).toEqual(equal)
    })
  })
})

test(`be 1000 type is Test`, () => {
  expect(_be.Test(
    1000
  )).toEqual(true)
})

test(`be 1001 type isn't Test`, () => {
  expect(_be.Test(
    1001
  )).toEqual(false)
})
