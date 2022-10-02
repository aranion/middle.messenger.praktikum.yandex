import { EditProfileFieldProps, FieldProfileProps } from '../../components'

export const PROFILE_FIELDS_EDIT: EditProfileFieldProps[] = [
  {
    label: 'Почта',
    inputProps: {
      value: '',
      typeField: 'email',
      id: 'email',
      fieldName: 'email',
    }
  },
  {
    label: 'Логин',
    inputProps: {
      value: '',
      id: 'login',
      fieldName: 'login',
    }
  },
  {
    label: 'Имя',
    inputProps: {
      value: '',
      id: 'first_name',
      fieldName: 'first_name',
    }
  },
  {
    label: 'Фамилия',
    inputProps: {
      value: '',
      id: 'second_name',
      fieldName: 'second_name',
    }
  },
  {
    label: 'Имя в чате',
    inputProps: {
      value: '',
      id: 'display_name',
      fieldName: 'display_name',
    }
  },
  {
    label: 'Телефон',
    inputProps: {
      value: '',
      typeField: 'tel',
      id: 'phone',
      fieldName: 'phone',
    }
  },
]

export const PROFILE_FIELDS: FieldProfileProps[] =
  PROFILE_FIELDS_EDIT.map(field => {
    return { label: field.label, value: field.inputProps?.value || '', inputProps: field.inputProps }
  })

export enum IdInputFieldPassword {
  oldPassword = "oldPassword",
  newPassword = "newPassword",
  newTwoPassword = 'newTwoPassword'
}

export const PROFILE_FIELDS_PASSWORD: EditProfileFieldProps[] = [
  {
    label: 'Старый пароль',
    inputProps: {
      value: '',
      typeField: 'password',
      id: IdInputFieldPassword.oldPassword,
      fieldName: 'password',
    }
  },
  {
    label: 'Новый пароль',
    inputProps: {
      value: '',
      typeField: 'password',
      id: IdInputFieldPassword.newPassword,
      fieldName: 'password',
    }
  },
  {
    label: 'Повторите новый пароль',
    inputProps: {
      value: '',
      typeField: 'password',
      id: IdInputFieldPassword.newTwoPassword,
      fieldName: 'password',
    }
  },
]
