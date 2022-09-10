import { EditProfileFieldProps, FieldProfileProps } from '../../components'

export const PROFILE_FIELDS_EDIT: EditProfileFieldProps[] = [
  {
    label: 'Почта',
    inputProps: {
      value: 'pochta@yandex.ru',
      typeField: 'email',
      id: 'email',
      fieldName: 'email',
    }
  },
  {
    label: 'Логин',
    inputProps: {
      value: 'ivanivanov',
      id: 'login',
      fieldName: 'login',
    }
  },
  {
    label: 'Имя',
    inputProps: {
      value: 'Иван',
      id: 'first_name',
      fieldName: 'first_name',
    }
  },
  {
    label: 'Фамилия',
    inputProps: {
      value: 'Фамилия',
      id: 'second_name',
      fieldName: 'second_name',
    }
  },
  {
    label: 'Имя в чате',
    inputProps: {
      value: 'Иван',
      id: 'display_name',
      fieldName: 'display_name',
    }
  },
  {
    label: 'Телефон',
    inputProps: {
      value: '+79099673030',
      typeField: 'tel',
      id: 'phone',
      fieldName: 'phone',
    }
  },
]

export const PROFILE_FIELDS: FieldProfileProps[] =
  PROFILE_FIELDS_EDIT.map(field => ({ label: field.label, value: field.inputProps?.value || '' }))

export const PROFILE_FIELDS_PASSWORD: EditProfileFieldProps[] = [
  {
    label: 'Старый пароль',
    inputProps: {
      value: '',
      typeField: 'password',
      id: 'password',
      fieldName: 'password',
    }
  },
  {
    label: 'Новый пароль',
    inputProps: {
      value: '',
      typeField: 'password',
      id: 'newPassword',
      fieldName: 'password',
    }
  },
  {
    label: 'Повторите новый пароль',
    inputProps: {
      value: '',
      typeField: 'password',
      id: 'newTwoPassword',
      fieldName: 'password',
    }
  },
]