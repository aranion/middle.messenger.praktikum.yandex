import API, { AuthAPI, SignInData, SignUpData } from '../api/AuthAPI'
import { RouteLink } from '../router/routeLink'
import Router from '../router/Router'
import store, { UserInfo } from '../store'
import { BaseController } from './BaseController'

export class AuthController extends BaseController {
  private readonly api: AuthAPI

  constructor() {
    super()
    this.api = API
  }

  async signIn(data: SignInData) {
    try {
      await this.api.signIn(data)
      await this.fetchUser()

      Router?.go(RouteLink.MESSENGER)
    } catch (e) {
      this.error(e)
    }
  }

  async signUp(data: SignUpData) {
    try {
      await this.api.signUp(data)
      await this.fetchUser()

      Router?.go(RouteLink.MESSENGER)
    } catch (e) {
      this.error(e)
    }
  }

  async logout() {
    try {
      await this.api.logout()
    } catch (e) {
      this.error(e)
    }
  }

  async fetchUser() {
    const { response }: { response: ResponseUser } = await this.api.read()

    store.set('settings', { user: response })
  }
}

export default new AuthController()

type ResponseUser = UserInfo