import { PropsButton } from '../../components/Button'
import { FieldFormProps } from '../../components/FieldForm'

export const PROPS_FIELDS_SIGN_IN: FieldFormProps[] = [
  {
    inputProps: {
      fieldName: 'login',
      id: 'login',
      typeField: 'text',
      placeholder: 'Логин',
    },
    label: 'Логин',
    errorMessage: 'Неверный логин',
  },
  {
    inputProps: {
      fieldName: 'notEmpty',
      id: 'password',
      typeField: 'password',
      placeholder: 'Пароль',
    },
    label: 'Пароль',
    errorMessage: 'Ошибка',
  },
]

export const PROPS_BUTTON_SIGN_IN: PropsButton = {
  label: 'Авторизоваться',
  buttonName: 'authorization',
  typeButton: 'submit',
}