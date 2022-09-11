import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfile, FieldProfileProps } from '../FieldProfile'
import template from './template.hbs'
import { ROUTE_LINK } from '../../router/routeLink'
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
      linkProfileAllEdit: ROUTE_LINK.PROFILE_EDIT,
      linkProfilePasswordEdit: ROUTE_LINK.PROFILE_PASSWORD,
      linkExit: ROUTE_LINK.CHATS,
    })
  }
}

export type InfoProfileProps = DefaultProps & {
  fields: FieldProfileProps[]
}
