import { PropsButton } from '../../components/Button'
import { FieldFormProps } from '../../components/FieldForm'

export const PROPS_FIELDS_REGISTRATION: FieldFormProps[] = [
  {
    inputProps: {
      fieldName: 'email',
      id: 'email',
      typeField: 'email',
      placeholder: 'Почта',
    },
    label: 'Почта',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'login',
      id: 'login',
      typeField: 'text',
      placeholder: 'Логин',
    },
    label: 'Логин',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'first_name',
      id: 'first_name',
      typeField: 'text',
      placeholder: 'Имя',
    },
    label: 'Имя',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'second_name',
      id: 'second_name',
      typeField: 'text',
      placeholder: 'Фамилия',
    },
    label: 'Фамилия',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'display_name',
      id: 'display_name',
      typeField: 'text',
      placeholder: 'Отображаемое имя',
    },
    label: 'Отображаемое имя',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'phone',
      id: 'phone',
      typeField: 'tel',
      placeholder: 'Телефон',
    },
    label: 'Телефон',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'password',
      id: 'password',
      typeField: 'password',
      placeholder: 'Пароль',
    },
    label: 'Пароль',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'password',
      id: 'password_second',
      typeField: 'password',
      placeholder: 'Пароль (ещё раз)',
    },
    label: 'Пароль (ещё раз)',
    errorMessage: 'Пароли не совпадают',
  },
]

export const PROPS_BUTTON_REGISTRATION: PropsButton = {
  label: 'Зарегистрироваться',
  buttonName: 'authorization',
  type: 'submit',
}