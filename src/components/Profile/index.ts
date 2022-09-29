import { PROFILE_FIELDS_PASSWORD, PROFILE_FIELDS, PROFILE_FIELDS_EDIT } from './../../constants/metaData/profile'
import { DefaultProps, Block } from '../../utils/Block'
import { ButtonCircle, InfoProfile, EditAvatar, EditProfile, Modal } from '..'
import { RouteLink } from '../../router/routeLink'
import { getAllValuesForm } from '../../utils/getAllElementForm'
import template from './template.hbs'
import './styles.sass'
import { withStore } from '../../hock/withStore'
import { State } from '../../store'

export class BaseProfile extends Block<ProfileProps> {

  constructor(props: ProfileProps) {
    super(props)
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    e.stopPropagation()

    const form = e.target as HTMLFormElement | null

    if (form) {
      getAllValuesForm(form)
    }

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

    this.children.EditAvatar = new EditAvatar({
      events: {
        click: () => {
          const Modal = this.getChildren().Modal as Modal

          Modal.show('flex')
        }
      }
    })

    this.children.ButtonBack = new ButtonCircle({
      direction: 'left',
      to: RouteLink.MESSENGER,
    })

    this.children.Modal = new Modal({
      title: 'Загрузите файл',
      btnLabel: 'Поменять',
      BodyElement: `
        <label for="avatar">
          Выбрать файл на компьютере
        </label>
        <input name="avatar" id="avatar" type="file" style="display: none" accept="image/*">`,
      error: null
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

export const Profile = withStore<ProfileProps>((state) => ({
  user: state.user ? { ...state.user } : null,
}))(BaseProfile)

export type ProfileProps = DefaultProps & Partial<State> & {
  switchType: SwitchTypeBodyProfile
}

type SwitchTypeBodyProfile = 'settingsInfo' | 'settingsEditFields' | 'settingsEditPassword'