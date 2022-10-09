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
      isChatsListEmpty: true,
      selectIdChat: null,
      chats: [],
      messages: {}
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
  isChatsListEmpty: boolean
  selectIdChat: number | null
  chats: Chats[]
  messages: Record<number, MessageState[]>
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

export type MessageState = {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: File
  id: number,
  is_read: boolean,
}

type File = {
  id: number
  user_id: number
  path: string
  filename: string
  content_type: string
  content_size: string
  upload_date: string
}