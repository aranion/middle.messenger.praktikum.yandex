import { Block } from '../../utils/Block'
import { Authorization } from '../../components/Authorization'
import './styles.sass'
import template from './template.hbs'
import { PROPS_BUTTON_SIGN_UP, PROPS_FIELDS_SIGN_UP } from '../../constants/metaData/signUp'
import { RouteLink } from '../../router/routeLink'
import { getAllValuesForm } from '../../utils/getAllElementForm'

export class SignUp extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.SignUp = new Authorization({
      formName: 'registration',
      title: 'Регистрация',
      fieldsProps: PROPS_FIELDS_SIGN_UP,
      buttonProps: PROPS_BUTTON_SIGN_UP,
      linkData: {
        to: RouteLink.HOME,
        label: 'Войти',
      },
      events: {
        submit: getAllValuesForm,
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
