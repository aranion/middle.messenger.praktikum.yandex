import { EditProfileFieldProps, FieldProfileProps } from '../../components';

export const PROFILE_FIELDS_EDIT: EditProfileFieldProps[] = [
  { label: 'Почта', value: 'pochta@yandex.ru', typeField: 'email' },
  { label: 'Логин', value: 'ivanivanov' },
  { label: 'Имя', value: 'Иван' },
  { label: 'Фамилия', value: 'Фамилия' },
  { label: 'Имя в чате', value: 'Иван' },
  { label: 'Телефон', value: '+7 (909) 967 30 30', typeField: 'tel' },
];

export const PROFILE_FIELDS: FieldProfileProps[] =
  PROFILE_FIELDS_EDIT.map(field => ({ label: field.label, value: field.value }));

export const PROFILE_FIELDS_PASSWORD: EditProfileFieldProps[] = [
  { label: 'Старый пароль', value: '', typeField: 'password' },
  { label: 'Новый пароль', value: '', typeField: 'password' },
  { label: 'Повторите новый пароль', value: '', typeField: 'password' },
];