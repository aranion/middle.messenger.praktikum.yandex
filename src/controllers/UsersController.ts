import { BaseController } from './BaseController'
import API, { UsersAPI } from '../api/UsersAPI'
import store from '../store'
import ResourcesController from './ResourcesController'

export class UsersController extends BaseController {
  private readonly api: UsersAPI

  constructor() {
    super()
    this.api = API
  }

  async putAvatar(data: any) {
    try {
      const { response } = await this.api.putAvatar(data)

      store.set('user', response)
      store.set('notification', { message: 'Фотография успешно загружена', title: 'Загрузка', typeMessage: 'access' })

      ResourcesController.getAvatar(response.avatar)
    } catch (e) {
      this.error(e)
    }
  }
}

export default new UsersController()