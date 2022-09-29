import API, { ResourcesAPI } from '../api/ResourcesAPI'
import store from '../store'
import { BaseController } from './BaseController'


export class ResourcesController extends BaseController {
  private readonly api: ResourcesAPI

  constructor() {
    super()
    this.api = API
  }

  async getAvatar(path: string) {
    try {
      const { responseURL } = await this.api.read(path)

      store.set('avatar', responseURL)
    } catch (e) {
      this.error(e)
    }
  }
}

export default new ResourcesController()