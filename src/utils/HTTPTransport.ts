import { queryStringify } from './queryStringify'

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }

  public get = <R extends XMLHttpRequest>(path: string = '/', options?: RequestOptions): Promise<R> => {
    if (!!options && !!options.data) {
      path = `${path}${queryStringify(options.data)}`
    }

    return this.request<R>(this.endpoint + path, { ...options, method: Methods.GET })
  };

  public post = <R extends XMLHttpRequest>(path: string, options?: RequestOptions): Promise<R> => {
    return this.request<R>(this.endpoint + path, { ...options, method: Methods.POST })
  }

  public put = <R extends XMLHttpRequest>(path: string, options?: RequestOptions): Promise<R> => {
    return this.request<R>(this.endpoint + path, { ...options, method: Methods.PUT })
  }

  public patch = <R extends XMLHttpRequest>(path: string, options?: RequestOptions): Promise<R> => {
    return this.request<R>(this.endpoint + path, { ...options, method: Methods.PATCH })
  }

  public delete = <R extends XMLHttpRequest>(path: string, options?: RequestOptions): Promise<R> => {
    return this.request<R>(path, { ...options, method: Methods.DELETE })
  }

  private request = <R extends XMLHttpRequest>(url: string, options?: RequestOptions): Promise<R> => {
    const {
      headers = {}, //'Content-Type': 'application/json'
      method = Methods.GET,
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
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr as R)
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.onabort = () => reject({ reason: 'abort' })
      xhr.onerror = () => reject({ reason: 'network error' })
      xhr.timeout = timeout
      xhr.ontimeout = () => reject({ reason: 'timeout' })

      headersKey.forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.withCredentials = true
      xhr.responseType = 'json'

      if (method === Methods.GET && !data) {
        xhr.send()
      } else if (url.includes('avatar')) {
        xhr.send(data as XMLHttpRequestBodyInit)
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  };
}

type RequestOptions = {
  method?: Methods
  headers?: Header
  timeout?: number
  data?: XMLHttpRequestBodyInit | any
}
type Header = Record<string, string>

