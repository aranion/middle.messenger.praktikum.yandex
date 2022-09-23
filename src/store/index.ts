import { Block } from '../utils/Block'
import { EventBus } from '../utils/EventBus'
import { set } from '../utils/helpers'

enum StoreEvents {
  Updated = 'Updated'
}

export class Store extends EventBus<keyof typeof StoreEvents> {
  private state: State = {}

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data)

    this.emit('Updated', this.getState())
  }

  public getState() {
    return this.state
  }
}

const store = new Store()

export function withStore(mapStateToProps: (state: State) => any) {
  return function wrap(Component: typeof Block) {
    return class WithStore extends Component {
      constructor(props: any) {
        const stateProps = mapStateToProps(store.getState)

        super({ ...props, ...stateProps })

        store.on('Updated', () => {
          const stateProps = mapStateToProps(store.getState)

          this.setProps({ ...stateProps })
        })
      }
    }
  }
}

export default store

type State = any