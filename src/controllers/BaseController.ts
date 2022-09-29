import store from '../store'

export class BaseController {
  protected error = (error: any) => {
    const message = error.reason
    const title = error.error

    console.log(error)
    store.set('notification', { message, title: `Ошибка ${title}`, typeMessage: 'error' })
  }

}

