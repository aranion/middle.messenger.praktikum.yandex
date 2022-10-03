import { PROPS_FIELDS_SIGN_IN, PROPS_BUTTON_SIGN_IN } from '../../constants/metaData/signIn'
import { Block } from '../../utils/Block'
import { Authorization, AuthorizationProps, BaseAuthorization } from '../../components'
import './styles.sass'
import template from './template.hbs'
import { RouteLink } from '../../router/routeLink'
import AuthController from '../../controllers/AuthController'
import { SignInData } from '../../api/AuthAPI'

const propsSignIn: AuthorizationProps = {
  formName: 'signInForm',
  title: 'Вход',
  fieldsProps: PROPS_FIELDS_SIGN_IN,
  buttonProps: PROPS_BUTTON_SIGN_IN,
  linkData: {
    to: RouteLink.SIGN_UP,
    label: 'Нет аккаунта?',
  }
}

export class SignIn extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.SignIn = new Authorization({
      ...propsSignIn,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          e.stopPropagation()

          const { SignIn } = this.getChildren() as unknown as { SignIn: BaseAuthorization }

          if (!Array.isArray(SignIn)) {
            const isValidateFieldsForm = SignIn.validateFields()
            const fieldsValue = SignIn.getFieldsFormValue<SignInData>()

            if (isValidateFieldsForm) {
              AuthController.signIn(fieldsValue)
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
