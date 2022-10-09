export function merge(lhs: Indexed, rhs: Indexed) {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed)
      } else {
        lhs[p] = rhs[p]
      }
    } catch (error) {
      lhs[p] = rhs[p]
    }
  }

  return lhs
}


export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc
  }), value as any)

  return merge(object, result)
}

function isPlainObject(value: unknown): value is Indexed {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value)
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key]
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue
      }
      return false
    }

    if (value !== rightValue) {
      return false
    }
  }

  return true
}

export function cloneDeep<T extends object = object>(obj: T) {
  return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    if (item === null || typeof item !== 'object') {
      return item
    }

    if (item instanceof Date) {
      return new Date(item.valueOf())
    }

    if (item instanceof Array) {
      const copy: any[] = []

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])))

      return copy
    }

    if (item instanceof Set) {
      const copy = new Set()

      item.forEach(v => copy.add(_cloneDeep(v)))

      return copy
    }

    if (item instanceof Map) {
      const copy = new Map()

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)))

      return copy
    }

    if (item instanceof Object) {
      const copy: any = {}

      Object.getOwnPropertySymbols(item).forEach(s => (copy[s] = _cloneDeep((item as any)[s])))

      Object.keys(item).forEach(k => (copy[k] = _cloneDeep((item as any)[k])))

      return copy
    }

    throw new Error(`Unable to copy object: ${item}`)
  })(obj)
}

type Indexed<T = any> = {
  [key in string]: T
}