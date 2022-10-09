import { DefaultProps, Block } from './../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { withStore } from '../../hock/withStore'
import { State } from '../../store'
import ResourcesController from '../../controllers/ResourcesController'

export class BaseEditAvatar extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected componentDidMount(): boolean {
    const { settings } = this.getProps()

    if (!settings) {
      return false
    }

    const { user, avatar } = settings

    if (avatar === '' && user && user.avatar) {
      ResourcesController.getAvatar(user.avatar)

      return true
    }

    return false
  }

  protected render() {
    const props = this.getProps()

    this.dispatchComponentDidMount()

    return this.compile(template, {
      srcAvatar: props.settings?.avatar,
    })
  }
}

export const EditAvatar = withStore<Props>((state) => ({
  settings: state.settings,
  messenger: state.messenger
}))(BaseEditAvatar)

type Props = DefaultProps & Partial<State> 