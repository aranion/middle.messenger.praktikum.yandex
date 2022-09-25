import { ResponseUser } from '../api/AuthAPI'
import { EventBus } from '../utils/EventBus'
import { set } from '../utils/helpers'

export enum StoreEvents {
  Updated = 'Updated'
}

export class Store extends EventBus<keyof typeof StoreEvents> {
  private state: State = {
    user: null,
    avatar: ''
  }

  public set(keypath: string, data: unknown) {
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
  avatar: ''
}
