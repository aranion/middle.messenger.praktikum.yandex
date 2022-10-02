import { ResponseUser } from '../controllers/UsersController'
import { EventBus } from '../utils/EventBus'
import { set } from '../utils/helpers'

export enum StoreEvents {
  Updated = 'Updated'
}

export class Store extends EventBus<keyof typeof StoreEvents> {
  private state: State = {
    user: null,
    avatar: '',
    notification: {
      message: null,
      title: null,
      typeMessage: 'info',
      timeShow: 2500
    },
    chats: []
  }

  public set<T extends keyof State>(keypath: T, data: State[T]) {
    set(this.state, keypath, data)
    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState() {
    return this.state
  }
}

const store = new Store()

export default store

export type State = {
  user: ResponseUser | null,
  avatar: string
  notification: StateNotification
  chats: ChatsState[]
}

export type StateNotification = {
  message: string | null
  typeMessage?: TypeMessage
  timeShow?: number
  title?: string | null
}
export type TypeMessage = 'error' | 'info' | 'success'

export type ChatsState = {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: ResponseUser
    time: string
    content: string
  }
}