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

  protected componentDidMount(): void {
    const { user } = this.getProps()
    if (user && user.avatar) {
      ResourcesController.getAvatar(user.avatar)
    }
  }

  protected render() {
    const props = this.getProps()

    this.dispatchComponentDidMount()

    return this.compile(template, { srcAvatar: props.avatar, })
  }
}

export const EditAvatar = withStore<Props>((state) => ({
  avatar: state.avatar,
  user: state.user
}))(BaseEditAvatar)

type Props = DefaultProps & Partial<State> 