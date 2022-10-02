import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfile, FieldProfileProps } from '../FieldProfile'
import template from './template.hbs'
import { RouteLink } from '../../router/routeLink'
import './styles.sass'
import { Link } from '../Link'
import AuthController from '../../controllers/AuthController'
import { withStore } from '../../hock/withStore'
import { State } from '../../store'

class BaseInfoProfile extends Block<InfoProfileProps> {
  constructor(props: InfoProfileProps) {
    super(props)
  }

  protected init(): void {
    const { fields } = this.getProps()

    this.children.Fields = fields.map(field => {
      return new FieldProfile(field)
    })

    this.children.LinkEdit = new Link({
      label: 'Изменить данные',
      to: RouteLink.SETTINGS_EDIT
    })

    this.children.LinkEditPassword = new Link({
      label: 'Изменить пароль',
      to: RouteLink.SETTINGS_PASSWORD
    })

    this.children.LinkExit = new Link({
      label: 'Выйти',
      to: RouteLink.HOME,
      events: {
        click: () => {
          AuthController.logout()
        }
      }
    })
  }

  render() {
    const props = this.getProps()
    const nameUser = props.user?.first_name

    return this.compile(template, {
      nameUser,
      ...props,

    })
  }
}
export const InfoProfile = withStore<InfoProfileProps>((state) => ({
  user: state.user ? { ...state.user } : null
}))(BaseInfoProfile)

export type InfoProfileProps = DefaultProps & Partial<State> & {
  fields: FieldProfileProps[]
}
