import { BaseController } from './BaseController'
import API, { ChatsAPI } from '../api/ChatsAPI'

export class ChatsController extends BaseController {
  private readonly api: ChatsAPI

  constructor() {
    super()

    this.api = API
  }

  async fetchChats() {
    try {
      await this.api.read()

    } catch (e) {
      this.error(e)
    }
  }
}

export default new ChatsController()