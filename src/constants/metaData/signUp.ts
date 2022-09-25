import { PropsButton } from '../../components/Button'
import { PropsFieldForm } from '../../components/FieldForm'

enum IdInputAuth {
  email = 'email',
  login = 'login',
  first_name = 'first_name',
  second_name = 'second_name',
  display_name = 'display_name',
  phone = 'phone',
  password = 'password',
  password_second = 'password_second',
}

export type IdInputProps = keyof typeof IdInputAuth

export const PROPS_FIELDS_SIGN_UP: PropsFieldForm[] = [
  {
    inputProps: {
      fieldName: 'email',
      id: IdInputAuth.email,
      typeField: 'email',
      placeholder: 'Почта',
    },
    label: 'Почта',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'login',
      id: IdInputAuth.login,
      typeField: 'text',
      placeholder: 'Логин',
    },
    label: 'Логин',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'first_name',
      id: IdInputAuth.first_name,
      typeField: 'text',
      placeholder: 'Имя',
    },
    label: 'Имя',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'second_name',
      id: IdInputAuth.second_name,
      typeField: 'text',
      placeholder: 'Фамилия',
    },
    label: 'Фамилия',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'display_name',
      id: IdInputAuth.display_name,
      typeField: 'text',
      placeholder: 'Отображаемое имя',
    },
    label: 'Отображаемое имя',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'phone',
      id: IdInputAuth.phone,
      typeField: 'tel',
      placeholder: 'Телефон',
    },
    label: 'Телефон',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'password',
      id: IdInputAuth.password,
      typeField: 'password',
      placeholder: 'Пароль',
    },
    label: 'Пароль',
    errorMessage: 'Ошибка',
  },
  {
    inputProps: {
      fieldName: 'password',
      id: IdInputAuth.password_second,
      typeField: 'password',
      placeholder: 'Пароль (ещё раз)',
    },
    label: 'Пароль (ещё раз)',
    errorMessage: 'Ошибка',
  },
]

export const PROPS_BUTTON_SIGN_UP: PropsButton = {
  label: 'Зарегистрироваться',
  buttonName: 'authorization',
  typeButton: 'submit',
}