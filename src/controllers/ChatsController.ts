import { BaseController } from './BaseController'
import API, { ChatsAPI, RequestCreateChat, RequestAddUserToChat, RequestChatUsers, RequestDeleteUserToChat } from '../api/ChatsAPI'
import store, { Chats } from '../store'
import WSController from './WSController'

export class ChatsController extends BaseController {
  private readonly api: ChatsAPI

  constructor() {
    super()

    this.api = API
  }

  setSelectChat(id: number) {
    store.set('messenger', { selectIdChat: id })
  }

  async createChat(titleChat: RequestCreateChat) {
    try {
      const { response } = await this.api.create(titleChat)
      const { id } = response as ResponseCreateChat

      if (id) {
        this.success(`Чат "${titleChat.title}" успешно добавлен`, 'Создание')
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
      const isChatsListEmpty = response.length === 0

      store.set('messenger', { chats: response, isLoading: false, isChatsListEmpty })

      response.map(async (chat) => {
        try {
          const res: { response: ResponseToken } = await this.getToken(chat.id)

          await WSController.connect(chat.id, res.response.token)
        } catch (e) {
          this.error(e)
        }
      })

    } catch (e) {
      this.error(e)
    }
  }

  async deleteChat() {
    try {
      const { messenger } = store.getState()

      if (messenger.selectIdChat) {
        const { response }: { response: ResponseDeleteChat } = await this.api.delete({ chatId: messenger.selectIdChat })

        store.set('messenger', { selectIdChat: null })

        this.success(`Чат "${response.result.title}" успешно удален `, 'Удаление')
        this.fetchChats()
      } else {
        this.success('Для удаления необходимо выбрать чат', 'Удаление', 'info')
      }

    } catch (e) {
      this.error(e)
    }
  }

  async getToken(chatId: number) {
    return this.api.getToken(chatId)
  }

  async addUserToChat(data: RequestAddUserToChat) {
    try {
      const { response }: { response: { reason: string } } = await this.api.addUserToChat(data)

      this.success('Пользователь успешно добавлен', 'Добавление')

      if (response) {
        this.success(`${response.reason}`, 'Ошибка')
      }
    } catch (e) {
      this.error(e)
    }
  }

  async deleteUserToChat(data: RequestDeleteUserToChat) {
    try {
      await this.api.deleteUserToChat(data)

      this.success('Пользователь успешно удален', 'Удаление')
    } catch (e) {
      this.error(e)
    }
  }

  async getChatUsers(data: RequestChatUsers) {
    try {
      const { response }: { response: ResponseChatUsers[] } = await this.api.getChatUsers(data)

      return response
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

type ResponseDeleteChat = {
  userId: number,
  result: Result
}

type Result = {
  id: number,
  title: string,
  avatar: string
}

type ResponseToken = {
  token: string
}

type ResponseChatUsers = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
  role: string
}
