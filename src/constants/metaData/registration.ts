import { PropsButton } from '../../components/Button'
import { FieldFormProps } from '../../components/FieldForm'

export const PROPS_FIELDS_REGISTRATION: FieldFormProps[] = [
  {
    fieldName: 'email',
    label: 'Почта',
    id: 'email',
    typeField: 'email',
    placeholder: 'Почта',
    errorMessage: 'Ошибка',
  },
  {
    fieldName: 'login',
    label: 'Логин',
    id: 'login',
    typeField: 'text',
    placeholder: 'Логин',
    errorMessage: 'Ошибка',
  },
  {
    fieldName: 'first_name',
    label: 'Имя',
    id: 'first_name',
    typeField: 'text',
    placeholder: 'Имя',
    errorMessage: 'Ошибка',
  },
  {
    fieldName: 'second_name',
    label: 'Фамилия',
    id: 'second_name',
    typeField: 'text',
    placeholder: 'Фамилия',
    errorMessage: 'Ошибка',
  },
  {
    fieldName: 'display_name',
    label: 'Отображаемое имя',
    id: 'display_name',
    typeField: 'text',
    placeholder: 'Отображаемое имя',
    errorMessage: 'Ошибка',
  },
  {
    fieldName: 'phone',
    label: 'Телефон',
    id: 'phone',
    typeField: 'tel',
    placeholder: 'Телефон',
    errorMessage: 'Ошибка',
  },
  {
    fieldName: 'password',
    label: 'Пароль',
    id: 'password',
    typeField: 'password',
    placeholder: 'Пароль',
    errorMessage: 'Ошибка',
  },
  {
    fieldName: 'password',
    label: 'Пароль (ещё раз)',
    id: 'password_second',
    typeField: 'password',
    placeholder: 'Пароль (ещё раз)',
    errorMessage: 'Пароли не совпадают',
  },
]

export const PROPS_BUTTON_REGISTRATION: PropsButton = {
  label: 'Зарегистрироваться',
  buttonName: 'authorization',
  type: 'submit'
}