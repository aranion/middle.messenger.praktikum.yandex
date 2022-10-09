export function queryStringify(data: XMLHttpRequestBodyInit) {
  const keys = Object.keys(data) as (keyof XMLHttpRequestBodyInit)[]

  if (typeof data !== 'object') {
    throw new Error('data не объект')
  }

  return keys.reduce((res, key, i) => `${res}${key}=${data[key]}${i < keys.length - 1 ? '&' : ''}`, '?')
}