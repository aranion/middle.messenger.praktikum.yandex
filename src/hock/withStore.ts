import { DefaultProps, Block } from './../utils/Block'
import store, { State } from '../store'
import { isEqual } from '../utils/helpers'

export function withStore<P extends DefaultProps>(mapStateToProps: (state: State) => any) {
  return function wrap(Component: typeof Block<P>) {
    let previousState: any

    return class WithStore<P> extends Component {
      constructor(props: P) {
        previousState = mapStateToProps(store.getState())

        super({ ...props, ...previousState })

        store.on('Updated', () => {
          const stateProps = mapStateToProps(store.getState())

          if (isEqual(previousState, stateProps)) {
            return
          }

          previousState = stateProps

          this.setProps({ ...stateProps })
        })
      }
    }
  }
}