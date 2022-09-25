import API, { ResourcesAPI } from '../api/ResourcesAPI'
import store from '../store'


export class ResourcesController {
  private readonly api: ResourcesAPI

  constructor() {
    this.api = API
  }

  async getAvatar(path: string) {
    try {
      const srcAvatar = await this.api.read(path)
      store.set('avatar', srcAvatar)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ResourcesController()