import { PropsButton } from '../../components/Button'
import { FieldFormProps } from '../../components/FieldForm'

export const PROPS_FIELDS_SIGN_IN: FieldFormProps[] = [
  {
    fieldName: 'login',
    label: 'Логин',
    id: 'login',
    typeField: 'text',
    placeholder: 'Логин',
    errorMessage: 'Неверный логин',
  },
  {
    fieldName: 'password',
    label: 'Пароль',
    id: 'password',
    typeField: 'password',
    placeholder: 'Пароль',
    errorMessage: 'Ошибка',
  }
]

export const PROPS_BUTTON_SIGN_IN: PropsButton = {
  label: 'Авторизоваться',
  buttonName: 'authorization',
  type: 'submit'
}