import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfile, FieldProfileProps } from '../FieldProfile'
import template from './template.hbs'
import { RouteLink } from '../../router/routeLink'
import './styles.sass'
import { Link } from '../Link'

export class InfoProfile extends Block<InfoProfileProps> {
  constructor(props: InfoProfileProps) {
    super(props)
  }

  protected init(): void {
    const { fields } = this.getProps()

    this.children.Fields = fields.map(field => {
      return new FieldProfile({ ...field })
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
      to: RouteLink.MESSENGER
    })
  }

  render() {
    const nameUser = 'NAME...'
    const props = this.getProps()

    return this.compile(template, {
      linkProfileAllEdit: RouteLink.SETTINGS_EDIT,
      linkProfilePasswordEdit: RouteLink.SETTINGS_PASSWORD,
      linkExit: RouteLink.MESSENGER,
      nameUser,
      ...props,

    })
  }
}

export type InfoProfileProps = DefaultProps & {
  fields: FieldProfileProps[]
}
