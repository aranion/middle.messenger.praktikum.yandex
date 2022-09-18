import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfile, FieldProfileProps } from '../FieldProfile'
import template from './template.hbs'
import { RouteLink } from '../../router/routeLink'
import './styles.sass'

export class InfoProfile extends Block<InfoProfileProps> {
  constructor(props: InfoProfileProps) {
    super(props)
  }

  protected init(): void {
    const { fields } = this.getProps()

    this.children.Fields = fields.map(field => {
      return new FieldProfile({ ...field })
    })
  }

  render() {
    const { fields } = this.getProps()
    const nameUser = fields[2].value

    return this.compile(template, {
      ...this.props,
      nameUser,
      linkProfileAllEdit: RouteLink.PROFILE_EDIT,
      linkProfilePasswordEdit: RouteLink.PROFILE_PASSWORD,
      linkExit: RouteLink.CHATS,
    })
  }
}

export type InfoProfileProps = DefaultProps & {
  fields: FieldProfileProps[]
}
