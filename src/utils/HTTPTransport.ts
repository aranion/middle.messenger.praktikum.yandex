export class HTTPTransport {
  public get = (url: string, options?: RequestOptions): Promise<XMLHttpRequest> => {
    if (!!options && !!options.data) {
      url = `${url}${queryStringify(options.data)}`
    }

    return this.request(url, { ...options, method: METHODS.GET })
  };

  public post = (url: string, options?: RequestOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.POST })
  }

  public put = (url: string, options?: RequestOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.PUT })
  }

  public delete = (url: string, options?: RequestOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.DELETE })
  }

  private request = (url: string, options?: RequestOptions): Promise<any> => {
    const {
      headers = {},
      method = METHODS.GET,
      data,
      timeout = 5000,
    } = options || {}

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('не передан метод запроса')
        return null
      }

      const xhr = new XMLHttpRequest()
      const headersKey = Object.keys(headers) as (keyof Header)[]

      xhr.open(method, url)

      headersKey.forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = () => { resolve(xhr) }
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (!data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  };
}

function queryStringify(data: XMLHttpRequestBodyInit) {
  const keys = Object.keys(data) as (keyof XMLHttpRequestBodyInit)[]

  if (typeof data !== 'object') {
    throw new Error('data не объект')
  }

  return keys.reduce((res, key, i) => `${res}${key}=${data[key]}${i < keys.length - 1 ? '&' : ''}`, '?')
}

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestOptions = {
  method?: METHODS
  headers?: Header
  timeout?: number
  data?: XMLHttpRequestBodyInit
}
type Header = Record<string, string>

