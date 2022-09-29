import { BaseAPI } from './BaseAPI'

enum Api {
  resources = '/'
}

export class ResourcesAPI extends BaseAPI {
  constructor() {
    super('/resources')
  }

  read(identifier: string): Promise<XMLHttpRequest> {
    return this.http.get(Api.resources + identifier)
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new ResourcesAPI()

