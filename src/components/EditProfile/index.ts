import { FieldForm } from './../FieldForm/index'
import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfileProps, Button, EditProfileField } from '../'
import { Link } from '../../router/routePage'
import template from './template.hbs'
import './styles.sass'

export class EditProfile extends Block<Props> {
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
        Link('PROFILE')
      }
    }

    this.children.EditProfileField = fields.map(field => {
      return new EditProfileField({ ...field })
    })

    this.children.ButtonSave = new Button({
      formName,
      buttonName: 'saveProfile',
      label: 'Сохранить',
      type: 'submit',
      events: {
        click: handleSubmitButton
      }
    })
  }

  render() {
    const { fields } = this.props

    return this.compile(template, {
      nameUser: fields[2].inputProps?.value || '',
      ...this.props,
    })
  }
}

type Props = DefaultProps & {
  fields: FieldProfileProps[]
  formName: string
}
