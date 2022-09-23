import { Button, PropsButton } from '../Button'
import { FieldForm, FieldFormProps } from '../FieldForm'
import { Block, DefaultProps } from '../../utils/Block'
import { RouteLink } from '../../router/routeLink'
import template from './template.hbs'
import './styles.sass'
import { Link, LinkProps } from '../Link'
import { PropsWithRouter, withRouter } from '../../hock/withRouter'

class BaseAuthorization extends Block<AuthorizationProps> {
  constructor(props: AuthorizationProps) {
    super(props)
  }

  protected init(): void {
    const { buttonProps, fieldsProps, formName, linkData } = this.getProps()

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
        const { router } = this.getProps()

        router!.go(RouteLink.MESSENGER)
      }
    }

    this.children.Link = new Link({ ...linkData })

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
    const props = this.getProps()

    return this.compile(template, { ...props })
  }
}

export const Authorization = withRouter<AuthorizationProps>(BaseAuthorization)

export type AuthorizationProps = DefaultProps & PropsWithRouter & {
  formName: string
  buttonProps: PropsButton
  fieldsProps: FieldFormProps[]
  title: string
  linkData: LinkProps<RouteLink>,
  events?: {
    submit: (e: SubmitEvent) => void
  }
}