import { PROPS_FIELDS_SIGN_IN, PROPS_BUTTON_SIGN_IN } from '../../constants/metaData/sigIn'
import { Block } from '../../utils/Block'
import { Authorization, AuthorizationProps } from '../../components/Authorization'
import './styles.sass'
import template from './template.hbs'
import { RouteLink } from '../../router/routeLink'
import { getAllValuesForm } from '../../utils/getAllElementForm'
import Router from '../../router/Router'

const propsSignIn: AuthorizationProps = {
  formName: 'signInForm',
  title: 'Вход',
  fieldsProps: PROPS_FIELDS_SIGN_IN,
  buttonProps: PROPS_BUTTON_SIGN_IN,
  linkData: {
    to: RouteLink.SIGN_UP,
    label: 'Нет аккаунта?',
    router: {} as typeof Router
  },
  events: {
    submit: getAllValuesForm,
  },
  router: {} as typeof Router
}

export class SignIn extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.SignIn = new Authorization({ ...propsSignIn })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

