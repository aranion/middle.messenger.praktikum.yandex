import { BaseAPI } from './BaseAPI'

enum Api {
  signup = '/signup',
  signin = '/signin',
  user = '/user',
  logout = '/logout',
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth')
  }

  signIn(data: SignInData) {
    return this.http.post(Api.signin, { data })
  }

  signUp(data: SignUpData) {
    return this.http.post(Api.signup, { data })
  }

  logout() {
    return this.http.post(Api.logout)
  }

  read() {
    return this.http.get(Api.user)
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new AuthAPI()

export type SignInData = {
  login: string
  password: string
}
export type SignUpData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}
