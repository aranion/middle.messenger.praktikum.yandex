import { Block } from '../../utils/Block'
import './styles.sass'
import template from './template.hbs'
import { PROPS_BUTTON_SIGN_UP, PROPS_FIELDS_SIGN_UP } from '../../constants/metaData/signUp'
import { RouteLink } from '../../router/routeLink'
import AuthController from '../../controllers/AuthController'
import { SignUpData } from '../../api/AuthAPI'
import { Authorization, AuthorizationProps, BaseAuthorization } from '../../components'

const propsSignUp: AuthorizationProps = {
  formName: 'registration',
  title: 'Регистрация',
  fieldsProps: PROPS_FIELDS_SIGN_UP,
  buttonProps: PROPS_BUTTON_SIGN_UP,
  linkData: {
    to: RouteLink.HOME,
    label: 'Войти',
  }
}

export class SignUp extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.SignUp = new Authorization({
      ...propsSignUp,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          e.stopPropagation()

          const { SignUp } = this.getChildren() as unknown as { SignUp: BaseAuthorization }

          if (!Array.isArray(SignUp)) {
            const isValidateFieldsForm = SignUp.validateFields()
            const fieldsValue = SignUp.getFieldsFormValue<SignUpData>()

            if (isValidateFieldsForm) {
              AuthController.signUp(fieldsValue)
            }
          }
        },
      },
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}