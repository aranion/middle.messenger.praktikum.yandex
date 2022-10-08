import { HTTPTransport } from '../utils/HTTPTransport'

export abstract class BaseAPI {
  protected http: HTTPTransport

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint)
  }

  public abstract create?(data: unknown): Promise<unknown>
  public abstract read?(identifier: unknown): Promise<unknown>
  public abstract update?(identifier: unknown, data: unknown): Promise<unknown>
  public abstract delete?(identifier: unknown): Promise<unknown>
} 