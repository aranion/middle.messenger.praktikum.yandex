import { IdInputFieldPassword } from '../constants/metaData/profile'
import { BaseAPI } from './BaseAPI'

enum Api {
  profile = '/profile',
  profileAvatar = '/profile/avatar',
  password = '/password',
  userId = '/',
  search = '/search',
}

export class UsersAPI extends BaseAPI {
  constructor() {
    super('/user')
  }

  putAvatar(data: FormData) {
    return this.http.put(Api.profileAvatar, { data, headers: {} })
  }

  putPassword(data: RequestPutPassword) {
    return this.http.put(Api.password, { data })
  }

  putProfile(data: RequestPutProfile) {
    return this.http.put(Api.profile, { data })
  }

  read() {
    return this.http.get(Api.userId)
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new UsersAPI()

enum KeysFieldProfile {
  first_name = "first_name",
  second_name = "second_name",
  display_name = "display_name",
  login = "login",
  email = "email",
  phone = "phone",
}

export type RequestPutPassword = { [key in Exclude<keyof typeof IdInputFieldPassword, 'newTwoPassword'>]: string }
export type RequestPutProfile = { [key in keyof typeof KeysFieldProfile]: string }