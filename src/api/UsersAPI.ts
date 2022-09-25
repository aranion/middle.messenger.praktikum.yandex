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

  putAvatar(data: any) {
    return this.http.put(Api.profileAvatar, { data })
  }

  read(): Promise<unknown> {
    return this.http.get(Api.userId)
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new UsersAPI()

