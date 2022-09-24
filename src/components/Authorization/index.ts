import { PropsErrorValidateInput } from './../ErrorValidateInput/index'
import { Button, PropsButton } from '../Button'
import { FieldForm, FieldFormProps } from '../FieldForm'
import { Block, DefaultProps } from '../../utils/Block'
import { RouteLink } from '../../router/routeLink'
import { Link, LinkProps } from '../Link'
import { PropsWithRouter, withRouter } from '../../hock/withRouter'
import { IdInputProps } from '../../constants/metaData/signUp'
import template from './template.hbs'
import './styles.sass'

class BaseAuthorization extends Block<AuthorizationProps> {
  constructor(props: AuthorizationProps) {
    super(props)
  }

  protected init(): void {
    const { buttonProps, fieldsProps, formName, linkData } = this.getProps()

    const onClickSubmitButton = () => {
      const FieldsForm = this.children.FieldsForm as FieldForm[] | FieldForm
      const fields = Array.isArray(FieldsForm) ? FieldsForm : []
      const [passwords, password_second] = fields.reduce<string[]>((res, field) => {
        const { inputProps } = field.getProps()
        const id = inputProps.id as IdInputProps

        if (id === 'password' || id === 'password_second') {
          const Element = field.getContent()
          const value = Element?.querySelector('input')?.value

          if (value !== undefined) {
            res.push(value)
          }
        }

        return res
      }, [])
      const isPasswordEqual = passwords === password_second
      const isValidate = fields.reduce((res, Field) => {
        const { ErrorValidateInput } = Field.getChildren()
        const { inputProps } = Field.getProps()
        const id = inputProps.id as IdInputProps
        const isValidateValue = Field.validate()

        if (!Array.isArray(ErrorValidateInput)) {
          const propsErrorValidateInput = ErrorValidateInput.getProps() as PropsErrorValidateInput

          if (id === 'password_second') {
            ErrorValidateInput.setProps({
              ...propsErrorValidateInput,
              isInvisible: isValidateValue && isPasswordEqual,
              errorMessage: isPasswordEqual ? 'Ошибка' : 'Пароли не совпадают'
            })
          } else {
            ErrorValidateInput.setProps({ ...propsErrorValidateInput, isInvisible: isValidateValue })
          }

        }

        return res && isValidateValue
      }, true)


      if (password_second ? isValidate && isPasswordEqual : isValidate) {
        const { router } = this.getProps()

        router!.go(RouteLink.MESSENGER)
      }
    }

    this.children.Link = new Link({ ...linkData })

    if (fieldsProps) {
      this.children.FieldsForm = fieldsProps.map(fieldProps => new FieldForm({ ...fieldProps }))
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