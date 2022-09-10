import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfile, FieldProfileProps } from '../FieldProfile'
import template from './template.hbs'
import './styles.sass'
import { ROUTE_LINK } from '../../router/routePage'

export class InfoProfile extends Block<Props> {
  constructor(props: Props) {
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
      linkExit: ROUTE_LINK.CHATS
    })
  }
}

type Props = DefaultProps & {
  fields: FieldProfileProps[]
}
