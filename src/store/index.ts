import { EventBus } from '../utils/EventBus'
import { set } from '../utils/helpers'

export enum StoreEvents {
  Updated = 'Updated'
}

export class Store extends EventBus<keyof typeof StoreEvents> {
  private state: State = {
    settings: {
      user: null,
      isLoadingAvatar: false,
      avatar: '',
    },
    notification: {
      message: null,
      title: null,
      typeMessage: 'info',
      timeShow: 2500
    },
    messenger: {
      isLoading: false,
      chats: []
    }
  }

  public set<T extends keyof State>(keypath: T, data: Partial<State[T]>) {
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
  settings: StateSettings
  notification: StateNotification
  messenger: StateMessenger
}

export type StateNotification = {
  message: string | null
  typeMessage?: TypeMessage
  timeShow?: number
  title?: string | null
}

export type StateMessenger = {
  isLoading: boolean
  chats: Chats[]
}

export type StateSettings = {
  user: UserInfo | null,
  isLoadingAvatar: boolean
  avatar: string
}

export type Chats = {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: LastMessage
}

export type UserInfo = {
  avatar: string | null
  display_name: string | null
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}
export type TypeMessage = 'error' | 'info' | 'success'

type LastMessage = {
  user: UserInfo
  time: string
  content: string
}
