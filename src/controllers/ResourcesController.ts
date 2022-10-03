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
      store.set('settings', { isLoadingAvatar: true })

      const { responseURL } = await this.api.read(path)

      store.set('settings', { avatar: responseURL, isLoadingAvatar: false })
    } catch (e) {
      this.error(e)
    }
  }
}

export default new ResourcesController()