import { DefaultProps } from './../../utils/Block'
import template from './template.hbs'
import { Block } from '../../utils/Block'
import './styles.sass'
import { Button, ButtonCircle, FieldProfile, FieldProfileProps, EditProfile, InfoProfile } from '../../components'
import DefaultAvatar from '../../assets/imgs/AvatarNoneIcon.svg'
import { ROUTE_LINK } from '../../router/routePage'

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props)
  }

  protected init(): void {
    const { fields, typePage } = this.getProps()

    switch (typePage) {
      case 'info':
        this.children.InfoProfile = new InfoProfile({ fields })
        break
      case 'edit':
        this.children.InfoProfile = new EditProfile({ fields })
        this.children.ButtonSaveInfo = new Button({ buttonName: 'saveInfo', label: 'Сохранить' })
        break
      case 'changePassword':
        this.children.InfoProfile = new EditProfile({ fields })
        this.children.ButtonSavePass = new Button({ buttonName: 'savePass', label: 'Сохранить' })
        break
      default:
        break
    }

    this.children.Button = new ButtonCircle({ direction: 'left', alt: 'назад' })
  }

  render() {
    const { fields } = this.getProps()
    const nameUser = fields[2].value

    return this.compile(template, {
      srcAvatar: DefaultAvatar,
      ...this.props,
      nameUser,
      backLink: ROUTE_LINK.CHATS
    })
  }
}

export type ProfileProps = DefaultProps & {
  fields: FieldProfileProps[]
  srcAvatar?: string
  typePage: TypePageProfile
}
type TypePageProfile = 'info' | 'edit' | 'changePassword' 