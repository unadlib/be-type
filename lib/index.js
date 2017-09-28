import CheckType from './defaultCheckType'

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
