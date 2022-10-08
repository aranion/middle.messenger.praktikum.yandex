import { BaseAPI } from './BaseAPI'

enum Api {
  chat = '/',
  getToken = '/token',
  users = '/users'
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  read() {
    return this.http.get(Api.chat)
  }

  create(data: RequestCreateChat) {
    return this.http.post(Api.chat, { data })
  }

  delete(data: RequestDeleteChat) {
    return this.http.delete(Api.chat, { data })
  }

  getToken(chatId: number) {
    return this.http.post(Api.getToken + `/${chatId}`)
  }

  addUserToChat(data: RequestAddUserToChat) {
    return this.http.put(Api.users, { data })
  }

  deleteUserToChat(data: RequestAddUserToChat) {
    return this.http.delete(Api.users, { data })
  }

  getChatUsers(data: RequestChatUsers) {
    return this.http.get(`/${data.chatId}` + Api.users)
  }

  update = undefined
}

export default new ChatsAPI()

export type RequestCreateChat = {
  title: string
}

export type RequestDeleteChat = {
  chatId: number
}

export type RequestAddUserToChat = {
  users: number[],
  chatId: number
}

export type RequestChatUsers = {
  chatId: number
}

export type RequestDeleteUserToChat = RequestAddUserToChat