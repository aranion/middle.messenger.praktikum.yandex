import { Button, PropsButton } from '../../components/Button'
import { FieldForm, FieldFormProps } from '../../components/FieldForm'
import { Block, DefaultProps } from './../../utils/Block'
import { ROUTE_LINK } from '../../router/routeLink'
import template from './template.hbs'
import { Link } from '../../router/routePage'
import './styles.sass'

export class Authorization extends Block<AuthorizationProps> {
  constructor(props: AuthorizationProps) {
    super(props)
  }

  protected init(): void {
    const { buttonProps, fieldsProps, formName } = this.getProps()

    const onClickSubmitButton = () => {
      const FieldsForm = this.children.FieldsForm as FieldForm[] | FieldForm
      const fields = Array.isArray(FieldsForm) ? FieldsForm : []

      const isValidate = fields.reduce((res, field) => {
        const { ErrorValidateInput } = field.getChildren()
        const isArrayErrorValidateInput = Array.isArray(ErrorValidateInput)
        const isValidateValue = field.validate()

        if (!isArrayErrorValidateInput) {
          const propsErrorValidateInput = ErrorValidateInput.getProps()

          ErrorValidateInput.setProps({ ...propsErrorValidateInput, isInvisible: isValidateValue })
        }
        return res && isValidateValue
      }, true)

      if (isValidate) {
        Link('CHATS')
      }
    }

    if (fieldsProps) {
      this.children.FieldsForm = fieldsProps.map((fieldProps) => {
        return new FieldForm({ ...fieldProps })
      })
    }

    if (buttonProps) {
      this.children.Button = new Button({
        formName,
        events: {
          click: onClickSubmitButton
        },
        ...buttonProps,
      })
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export type AuthorizationProps = DefaultProps & {
  formName: string
  buttonProps: PropsButton
  fieldsProps: FieldFormProps[]
  title: string
  linkData: {
    title: string
    link: ROUTE_LINK
  },
  events?: {
    submit: (e: SubmitEvent) => void
  }
}