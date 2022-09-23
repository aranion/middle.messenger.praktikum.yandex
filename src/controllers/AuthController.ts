import API, { AuthAPI, SignInData, SignUpData } from '../api/AuthAPI'

export class AuthController {
  private readonly api: AuthAPI
  constructor() {
    this.api = API
  }

  async signIn(data: SignInData) {
    await this.api.signIn(data)
  }

  async signUp(data: SignUpData) {
    await this.api.signUp(data)
  }

  async logout() {
    await this.api.logout()
  }

  async fetchUser() {
    await this.api.read()
  }
}

export default new AuthController()