import { BaseAPI } from './BaseAPI'

enum Api {
  chat = '/',
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  read(): Promise<unknown> {
    return this.http.get(Api.chat)
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new ChatsAPI()

