import { PROFILE_FIELDS_PASSWORD, PROFILE_FIELDS, PROFILE_FIELDS_EDIT } from './../../constants/metaData/profile'
import { EditProfile } from './../EditProfile/index'
import { DefaultProps, Block } from '../../utils/Block'
import { ButtonCircle, InfoProfile } from '..'
import DefaultAvatar from '../../assets/imgs/AvatarNoneIcon.svg'
import { RouteLink } from '../../router/routeLink'
import { getAllValuesForm } from '../../utils/getAllElementForm'
import template from './template.hbs'
import './styles.sass'

export class Profile extends Block<Props> {

  constructor(props: Props) {
    super(props)
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    e.stopPropagation()

    getAllValuesForm(e)
  }

  protected init(): void {
    const { switchType } = this.getProps()

    switch (switchType) {
      case 'settingsInfo':
        this.children.BodyProfile = new InfoProfile({ fields: PROFILE_FIELDS })
        break
      case 'settingsEditFields':
        this.children.BodyProfile = new EditProfile({
          fields: PROFILE_FIELDS_EDIT,
          formName: 'formSettingsEditFields',
          events: {
            submit: this.handleSubmit
          }
        })
        break
      case 'settingsEditPassword':
        this.children.BodyProfile = new EditProfile({
          fields: PROFILE_FIELDS_PASSWORD,
          formName: 'formSettingsEditPassword',
          events: {
            submit: this.handleSubmit
          }
        })
        break
      default:
        break
    }

    this.children.ButtonBack = new ButtonCircle({
      direction: 'left',
      to: RouteLink.MESSENGER,
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      srcAvatar: DefaultAvatar,
      ...props,
    })
  }
}

type Props = DefaultProps & {
  switchType: SwitchTypeBodyProfile
}

type SwitchTypeBodyProfile = 'settingsInfo' | 'settingsEditFields' | 'settingsEditPassword'