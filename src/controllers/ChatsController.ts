import API, { ChatsAPI } from '../api/ChatsAPI'

export class ChatsController {
  private readonly api: ChatsAPI

  constructor() {
    this.api = API
  }

  async fetchChats() {
    try {
      await this.api.read()

    } catch (error) {
      console.log(error)
    }
  }
}

export default new ChatsController()