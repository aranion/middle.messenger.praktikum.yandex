import { Button, PropsButton } from '../../components/Button'
import { FieldForm, FieldFormProps } from '../../components/FieldForm'
import { Block, DefaultProps } from './../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { ROUTE_LINK } from '../../router/routePage'

export class Authorization extends Block<AuthorizationProps> {
  constructor(props: AuthorizationProps) {
    super(props)
  }

  protected init(): void {
    const { buttonProps, fieldsProps, formName } = this.getProps()

    if (fieldsProps) {
      this.children.FieldsForm = fieldsProps.map((fieldProps) => {
        return new FieldForm({ ...fieldProps })
      })
    }

    if (buttonProps) {
      this.children.Button = new Button({
        ...buttonProps,
        formName
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