import { FieldForm } from './../FieldForm/index'
import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfileProps, Button, EditProfileField } from '../'
import template from './template.hbs'
import './styles.sass'
import { PropsWithRouter, withRouter } from '../../hock/withRouter'
import { RouteLink } from '../../router/routeLink'

export class BaseEditProfile extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected init(): void {
    const { fields, formName } = this.getProps()

    const handleSubmitButton = () => {
      const { EditProfileField } = this.children
      const fields = Array.isArray(EditProfileField) ? EditProfileField : []

      const isValidate = fields.reduce((res, field) => {
        const children = field.getChildren()
        const FieldForm = children.FieldForm as FieldForm
        const isNotArrayFieldForm = !Array.isArray(FieldForm)

        if (isNotArrayFieldForm) {
          const { ErrorValidateInput } = FieldForm.getChildren()
          const isArrayErrorValidateInput = Array.isArray(ErrorValidateInput)
          const isValidateValue = FieldForm.validate()

          if (!isArrayErrorValidateInput) {
            const propsErrorValidateInput = ErrorValidateInput.getProps()

            ErrorValidateInput.setProps({ ...propsErrorValidateInput, isInvisible: isValidateValue })
          }
          return res && isValidateValue
        }
      }, true)

      if (isValidate) {
        const { router } = this.getProps()

        router?.go(RouteLink.SETTINGS)
      }
    }

    this.children.EditProfileField = fields.map(field => new EditProfileField({ ...field }))

    this.children.ButtonSave = new Button({
      formName,
      buttonName: 'saveProfile',
      label: 'Сохранить',
      typeButton: 'submit',
      events: {
        click: handleSubmitButton
      }
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      nameUser: 'NAME...',
      ...props,
    })
  }
}

export const EditProfile = withRouter(BaseEditProfile)

type Props = DefaultProps & PropsWithRouter & {
  fields: FieldProfileProps[]
  formName: string
}
