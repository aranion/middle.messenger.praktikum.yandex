import { queryStringify } from './queryStringify'

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export class HTTPTransport {
  public get = (url: string, options?: RequestOptions): Promise<XMLHttpRequest> => {
    if (!!options && !!options.data) {
      url = `${url}${queryStringify(options.data)}`
    }

    return this.request(url, { ...options, method: Methods.GET })
  };

  public post = (url: string, options?: RequestOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: Methods.POST })
  }

  public put = (url: string, options?: RequestOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: Methods.PUT })
  }

  public delete = (url: string, options?: RequestOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: Methods.DELETE })
  }

  private request = (url: string, options?: RequestOptions): Promise<any> => {
    const {
      headers = {},
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

type RequestOptions = {
  method?: Methods
  headers?: Header
  timeout?: number
  data?: XMLHttpRequestBodyInit
}
type Header = Record<string, string>

