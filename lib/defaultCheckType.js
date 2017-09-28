import be from './index'

const FUNCTION = 'function'
const OBJECT = 'object'
const STRING = 'string'
const NUMBER = 'number'
const BOOLEAN = 'boolean'
const ELEMENT_NODE_TYPE = 1
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
const reRegExpCharFn = /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g

class CheckType {
  Function(value){
    return typeof value === FUNCTION
  }
  Object(value){
    return typeof value === OBJECT
  }
  String(value){
    return be.string(value) && typeof value === STRING
  }
  Number(value){
    return be.number(value) && typeof value === NUMBER
  }
  Boolean(value){
    return be.boolean(value) && typeof value === BOOLEAN
  }
  NaN(value) {
    return be.number(value) && isNaN(value)
  }
  Nil(value) {
    return be.undefined(value) || be.null(value)
  }
  Empty(value){
    return (
      (typeof value === OBJECT && !be.null(value) && Object.keys(value).length === 0) ||
      be.Boolean(value) ||
      be.Function(value) ||
      be.Nil(value) ||
      value === '' ||
      value === 0
    )
  }
  Infinity(value){
    return Infinity === value
  }
  Finite(value){
    return be.Number(value) && !be.Infinity(value) && !be.NaN(value)
  }
  Native(value){
    const reIsNative = new RegExp(`^${
      Function.prototype.toString.call(Object.prototype.hasOwnProperty)
        .replace(reRegExpChar, '\\$&')
        .replace(reRegExpCharFn, '$1.*?')
      }$`)
    return be.Function(value) && reIsNative.test(value)
  }
  SafeInteger(value){
    return Number.isInteger(value) && value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER
  }
  Integer(value){
    return Number.isInteger(value)
  }
  Element(value){
    return be.Object(value) && !be.object(value) && value.nodeType === ELEMENT_NODE_TYPE
  }
}

export {
  CheckType as default
}
