import { PROFILE_FIELDS_PASSWORD, PROFILE_FIELDS, PROFILE_FIELDS_EDIT } from './../../constants/metaData/profile'
import { DefaultProps, Block } from '../../utils/Block'
import {
  ButtonCircle,
  InfoProfile,
  EditAvatar,
  EditProfile,
  Modal,
  FieldProfileProps,
  BaseEditProfile,
  BodyModalAvatar,
} from '..'
import { RouteLink } from '../../router/routeLink'
import template from './template.hbs'
import './styles.sass'
import { withStore } from '../../hock/withStore'
import { State, UserInfo } from '../../store'
import UsersController from '../../controllers/UsersController'
import { RequestPutPassword, RequestPutProfile } from '../../api/UsersAPI'

export class BaseProfile extends Block<ProfileProps> {

  constructor(props: ProfileProps) {
    super(props)
  }

  protected init(): void {
    const { switchType, settings } = this.getProps()

    if (!settings) {
      return
    }

    const { user } = settings

    switch (switchType) {
      case 'settingsInfo':
        this.children.BodyProfile = new InfoProfile({
          fields: PROFILE_FIELDS.map(item => {

            if (user && item.inputProps && item.inputProps.id) {
              const key = item.inputProps.id as keyof UserInfo

              return { ...item, value: user[key] }
            }
          })
        })
        break
      case 'settingsEditFields':
        this.children.BodyProfile = new EditProfile({
          fields: PROFILE_FIELDS_EDIT.reduce<FieldProfileProps[]>((res, item) => {
            const { inputProps } = item

            if (user && inputProps && inputProps.id) {
              const key = inputProps.id as keyof UserInfo

              if (user && key) {
                const value = user[key] === null ? '' : user[key]

                if (value || typeof value === 'string') {
                  const field = {
                    ...item,
                    inputProps: {
                      ...inputProps,
                      value: typeof value === 'number' ? `${value}` : value
                    }
                  }

                  res.push(field)
                }
              }
            }
            return res
          }, []),
          formName: 'formSettingsEditFields',
          events: {
            submit: (e: SubmitEvent) => {
              e.preventDefault()
              e.stopPropagation()

              const { BodyProfile } = this.getChildren() as { BodyProfile: BaseEditProfile }

              if (!Array.isArray(BodyProfile)) {
                const isValidateFieldsForm = BodyProfile.validateFields()
                const fieldsValue = BodyProfile.getFieldsFormValue<RequestPutProfile>()

                if (isValidateFieldsForm) {
                  UsersController.putProfile(fieldsValue)
                }
              }
            }
          }
        })
        break
      case 'settingsEditPassword':
        this.children.BodyProfile = new EditProfile({
          fields: PROFILE_FIELDS_PASSWORD,
          formName: 'formSettingsEditPassword',
          events: {
            submit: (e: SubmitEvent) => {
              e.preventDefault()
              e.stopPropagation()

              const { BodyProfile } = this.getChildren() as { BodyProfile: BaseEditProfile }

              if (!Array.isArray(BodyProfile)) {
                const isValidateFieldsForm = BodyProfile.validateFields()
                const { newPassword, oldPassword } = BodyProfile.getFieldsFormValue<RequestPutPassword>()

                if (isValidateFieldsForm) {
                  UsersController.putPassword({ newPassword, oldPassword, })
                }
              }
            }
          }
        })
        break
      default:
        break
    }

    this.children.EditAvatar = new EditAvatar({
      events: {
        click: () => {
          const Modal = this.getChildren().Modal

          if (!Array.isArray(Modal)) {
            const element = Modal.getContent()

            element?.classList.remove('hidden')
          }
        }
      }
    })

    this.children.ButtonBack = new ButtonCircle({
      direction: 'left',
      to: RouteLink.MESSENGER,
    })

    this.children.Modal = new Modal({ BodyElement: BodyModalAvatar })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

export const Profile = withStore<ProfileProps>((state) => ({
  settings: state.settings,
}))(BaseProfile)

export type ProfileProps = DefaultProps & Partial<State> & {
  switchType: SwitchTypeBodyProfile
}

type SwitchTypeBodyProfile = 'settingsInfo' | 'settingsEditFields' | 'settingsEditPassword'