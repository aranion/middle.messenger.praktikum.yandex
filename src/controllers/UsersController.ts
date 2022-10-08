import { BaseController } from './BaseController'
import API, { RequestPutPassword, RequestPutProfile, RequestSearchUsers, UsersAPI } from '../api/UsersAPI'
import store, { UserInfo } from '../store'
import ResourcesController from './ResourcesController'
import Router from '../router/Router'
import { RouteLink } from '../router/routeLink'

export class UsersController extends BaseController {
  private readonly api: UsersAPI

  constructor() {
    super()

    this.api = API
  }

  async putAvatar(data: FormData) {
    try {
      const { response }: { response: ResponseUser } = await this.api.putAvatar(data)

      store.set('settings', { user: response })
      this.success('Фотография успешно загружена', 'Загрузка')

      if (response.avatar) {
        ResourcesController.getAvatar(response.avatar)
      }
    } catch (e) {
      this.error(e)
    }
  }

  async putPassword(data: RequestPutPassword) {
    try {
      await this.api.putPassword(data)

      Router?.go(RouteLink.SETTINGS)
      this.success('Пароль успешно изменен', 'Изменение')
    } catch (e) {
      this.error(e)
    }
  }

  async putProfile(data: RequestPutProfile) {
    try {
      const { response }: { response: ResponseUser } = await this.api.putProfile(data)

      store.set('settings', { user: response })
      this.success('Данные успешно обновлены', 'Изменение')
      Router?.go(RouteLink.SETTINGS)
    } catch (e) {
      this.error(e)
    }
  }

  async searchUsers(data: RequestSearchUsers) {
    try {
      const { response }: { response: ResponseUser[] } = await this.api.searchUsers(data)

      return response
    } catch (e) {
      this.error(e)
    }
  }
}

export default new UsersController()

type ResponseUser = UserInfo
