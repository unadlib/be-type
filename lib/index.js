class CheckType {
  Function(value){
    return typeof value === 'function'
  }
  Object(value){
    return typeof value === 'object'
  }
  String(value){
    return be.string(value) && typeof value === 'string'
  }
  Number(value){
    return be.number(value) && typeof value === 'number'
  }
  Boolean(value){
    return be.boolean(value) && typeof value === 'boolean'
  }
  NaN(value) {
    return be.number(value) && isNaN(value)
  }
  Nil(value) {
    return be.undefined(value) || be.null(value)
  }
  Empty(value){
    return (
      (typeof value === 'object' && !be.null(value) && Object.keys(value).length === 0) ||
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
    const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
    const reRegExpCharFn = /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g
    const reIsNative = RegExp(`^${
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
    return be.Object(value) && !be.object(value) && value.nodeType === 1
  }
}

export const setBe = (setting = {}) => {
  return new Proxy(
    {},
    {
      get: (target, name) => value => {
        const checkType = new CheckType()
        let transform = {}
        Object.entries(setting).forEach(([key,value])=>{
          const name = key[0].toUpperCase() + key.slice(1)
          transform[name] = value
        })
        Object.assign(checkType,transform)
        const check = checkType[name]
        if(check){
          return check(value)
        }
        const type = value::Object.prototype.toString().slice(8, -1)
        return type[0].toLowerCase() + type.slice(1) === name
      },
    },
  )
}

const be = setBe()
export default be
