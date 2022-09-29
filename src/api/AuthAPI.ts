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
    return this.http.post(Api.signin, { data, headers: { 'Content-Type': 'application/json' } })
  }

  signUp(data: SignUpData) {
    return this.http.post(Api.signup, { data })
  }

  logout() {
    return this.http.post(Api.logout)
  }

  read(): Promise<XMLHttpRequest> {
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
export type ResponseUser = {
  avatar: string | null
  display_name: string | null
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}