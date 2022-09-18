import { Link } from './../../router/routePage'
import { DefaultProps, Block } from './../../utils/Block'
import { ButtonCircle, FieldProfileProps, EditProfile, InfoProfile } from '../../components'
import DefaultAvatar from '../../assets/imgs/AvatarNoneIcon.svg'
import { RouteLink } from '../../router/routeLink'
import { getAllValuesForm } from '../../utils/getAllElementForm'
import template from './template.hbs'
import './styles.sass'

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props)
  }

  protected init(): void {
    const { fields, typePage } = this.getProps()

    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault()
      e.stopPropagation()

      getAllValuesForm(e)
    }

    const handleClickBack = () => {
      Link('CHATS')
    }

    switch (typePage) {
      case 'info':
        this.children.Profile = new InfoProfile({ fields })
        break
      case 'edit':
        this.children.Profile = new EditProfile({
          fields,
          formName: 'formEditAll',
          events: {
            submit: handleSubmit
          }
        })
        break
      case 'changePassword':
        this.children.Profile = new EditProfile({
          fields,
          formName: 'formChangePassword',
          events: {
            submit: handleSubmit
          }
        })
        break
      default:
        break
    }

    this.children.ButtonBack = new ButtonCircle({
      direction: 'left',
      alt: 'назад',
      events: {
        click: handleClickBack
      }
    })
  }

  render() {
    const { fields } = this.getProps()
    const nameUser = fields[2].inputProps?.value

    return this.compile(template, {
      srcAvatar: DefaultAvatar,
      backLink: RouteLink.CHATS,
      nameUser,
      ...this.props,
    })
  }
}

export type ProfileProps = DefaultProps & {
  fields: FieldProfileProps[]
  srcAvatar?: string
  typePage: TypePageProfile
}
type TypePageProfile = 'info' | 'edit' | 'changePassword' 