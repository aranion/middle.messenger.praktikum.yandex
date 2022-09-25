import API, { AuthAPI, ResponseUser, SignInData, SignUpData } from '../api/AuthAPI'
import { RouteLink } from '../router/routeLink'
import Router from '../router/Router'
import store from '../store'

export class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signIn(data: SignInData) {

    try {
      await this.api.signIn(data)
      // await this.getUser()
      Router?.go(RouteLink.MESSENGER)
    } catch (error) {
      console.log(error)
    }
  }

  async signUp(data: SignUpData) {
    try {
      await this.api.signUp(data)
      // await this.getUser()
      Router?.go(RouteLink.MESSENGER)
    } catch (error) {
      console.log(error)
    }
  }

  async logout() {
    try {
      await this.api.logout()
    } catch (error) {
      console.log(error)
    }
  }

  async fetchUser() {
    const response = await this.api.read() as ResponseUser
    store.set('user', response)
  }
}

export default new AuthController()