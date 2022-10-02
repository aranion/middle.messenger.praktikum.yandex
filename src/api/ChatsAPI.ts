import { BaseAPI } from './BaseAPI'

enum Api {
  chat = '/',
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  read() {
    return this.http.get(Api.chat)
  }

  createChat(data: RequestCreateChat) {
    return this.http.post(Api.chat, { data })
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new ChatsAPI()

export type RequestCreateChat = {
  title: string
}