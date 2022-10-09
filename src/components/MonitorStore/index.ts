import { DefaultProps, Block } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { withStore } from '../../hock/withStore'
import { State } from '../../store'

export class BaseMonitorStore extends Block<PropsMonitorStore> {
  constructor(props: PropsMonitorStore) {
    super(props)
  }


  render() {
    const props = this.getProps()
    const store = JSON.stringify(props, null, 4)

    return this.compile(template, {
      store,
      ...props,
    })
  }
}

export const MonitorStore = withStore<PropsMonitorStore>(state => ({
  ...state
}))(BaseMonitorStore)

export type PropsMonitorStore = DefaultProps & Partial<State> 