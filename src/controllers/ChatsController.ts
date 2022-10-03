import { BaseController } from './BaseController'
import API, { ChatsAPI, RequestCreateChat } from '../api/ChatsAPI'
import store, { Chats } from '../store'

export class ChatsController extends BaseController {
  private readonly api: ChatsAPI

  constructor() {
    super()

    this.api = API
  }

  async createChat(titleChat: RequestCreateChat) {
    try {
      const { response } = await this.api.createChat(titleChat)
      const { id } = response as ResponseCreateChat

      if (id) {
        this.success('Чат успешно добавлен', 'Создание')
        this.fetchChats()
      } else {
        this.error('Произошла ошибка при получении чатов')
      }
    } catch (e) {
      this.error(e)
    }
  }

  async fetchChats() {
    try {
      store.set('messenger', { isLoading: true })

      const { response }: { response: ResponseChats[] } = await this.api.read()

      store.set('messenger', { chats: response, isLoading: false })
    } catch (e) {
      this.error(e)
    }
  }
}

export default new ChatsController()

type ResponseCreateChat = {
  id: number
}
type ResponseChats = Chats