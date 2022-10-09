import store, { TypeMessage } from '../store'

export class BaseController {
  protected error = (error: any) => {
    const message = error?.reason || 'not message'
    const title = error?.error || ''

    console.log(error)
    store.set('notification', { message, title: `Ошибка ${title}`, typeMessage: 'error' })
  }

  protected success = (message: string, title: string, typeMessage: TypeMessage = 'success') => {
    store.set('notification', { message, title, typeMessage })
  }

}

