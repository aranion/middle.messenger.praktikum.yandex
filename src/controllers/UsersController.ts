import API, { UsersAPI } from '../api/UsersAPI'

export class UsersController {
  private readonly api: UsersAPI

  constructor() {
    this.api = API
  }

  async putAvatar(data: any) {
    try {
      await this.api.putAvatar(data)

    } catch (error) {
      console.log(error)
    }
  }
}

export default new UsersController()