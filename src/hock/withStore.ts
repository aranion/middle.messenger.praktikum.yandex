import { DefaultProps, Block } from './../utils/Block'
import store, { State } from '../store'
import { cloneDeep, isEqual } from '../utils/helpers'

export function withStore<P extends DefaultProps>(mapStateToProps: (state: State) => Partial<State>) {
  return function wrap(Component: typeof Block<P>) {
    let oldState: Partial<State>

    return class WithStore<P> extends Component {
      constructor(props: P) {
        oldState = cloneDeep(mapStateToProps(store.getState())) as Partial<State>

        super({ ...props, ...oldState })

        store.on('Updated', () => {
          const stateProps = mapStateToProps(store.getState())

          if (!isEqual(oldState, stateProps)) {
            this.setProps({ ...stateProps } as any)
          }

          oldState = cloneDeep(stateProps) as Partial<State>
        })
      }
    }
  }
}