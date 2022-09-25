import { PropsButton } from '../../components/Button'
import { PropsFieldForm } from '../../components/FieldForm'

enum IdInputPropsSignIn {
  login = 'login',
  password = 'password',
}

export const PROPS_FIELDS_SIGN_IN: PropsFieldForm[] = [
  {
    inputProps: {
      fieldName: 'login',
      id: IdInputPropsSignIn.login,
      typeField: 'text',
      placeholder: 'Логин',
    },
    label: 'Логин',
    errorMessage: 'Неверный логин',
  },
  {
    inputProps: {
      fieldName: 'notEmpty',
      id: IdInputPropsSignIn.password,
      typeField: 'password',
      placeholder: 'Пароль',
    },
    label: 'Пароль',
    errorMessage: 'Введите пароль',
  },
]

export const PROPS_BUTTON_SIGN_IN: PropsButton = {
  label: 'Авторизоваться',
  buttonName: 'authorization',
  typeButton: 'submit',
}