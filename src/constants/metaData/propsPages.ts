import { AuthorizationProps, ChatsProps, ErrorProps, ProfileProps } from '../../pages'
import { ROUTE_LINK } from '../../router/routeLink'
import { getAllValuesForm } from '../../utils/getAllElementForm'
import { CHATS_LIST, MENU_ADD_CONTENT_MESSAGE, MENU_CHANGE_FRIENDS } from './chats'
import { PROFILE_FIELDS, PROFILE_FIELDS_EDIT, PROFILE_FIELDS_PASSWORD } from './profile'
import { PROPS_BUTTON_REGISTRATION, PROPS_FIELDS_REGISTRATION } from './registration'
import { PROPS_BUTTON_SIGN_IN, PROPS_FIELDS_SIGN_IN } from './sigIn'

export const propsSignIn: AuthorizationProps = {
  formName: 'signInForm',
  title: 'Вход',
  fieldsProps: PROPS_FIELDS_SIGN_IN,
  buttonProps: PROPS_BUTTON_SIGN_IN,
  linkData: {
    link: ROUTE_LINK.REGISTRATION,
    title: 'Нет аккаунта?',
  },
  events: {
    submit: getAllValuesForm,
  },
}


export const propsRegistration: AuthorizationProps = {
  formName: 'registration',
  title: 'Регистрация',
  fieldsProps: PROPS_FIELDS_REGISTRATION,
  buttonProps: PROPS_BUTTON_REGISTRATION,
  linkData: {
    link: ROUTE_LINK.HOME,
    title: 'Войти',
  },
  events: {
    submit: getAllValuesForm,
  },
}

export const propsServerError: ErrorProps = {
  title: '500',
  href: ROUTE_LINK.CHATS,
  text: 'Мы уже фиксим',
  labelLink: 'Назад к чатам',
}

export const propsChats: ChatsProps = {
  chatsList: CHATS_LIST,
  subMenuAddContent: MENU_ADD_CONTENT_MESSAGE,
  subMenuChangeFriends: MENU_CHANGE_FRIENDS,
}

export const propsProfile: ProfileProps = {
  fields: PROFILE_FIELDS,
  typePage: 'info',
}

export const propsProfileEdit: ProfileProps = {
  fields: PROFILE_FIELDS_EDIT,
  typePage: 'edit',
}

export const propsProfilePassword: ProfileProps = {
  fields: PROFILE_FIELDS_PASSWORD,
  typePage: 'changePassword',
}

export const propsNotFound: ErrorProps = {
  title: '404',
  href: ROUTE_LINK.CHATS,
  text: 'Не туда попали',
  labelLink: 'Назад к чатам',
}
