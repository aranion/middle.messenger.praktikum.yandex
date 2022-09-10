import { PROPS_BUTTON_SIGN_IN } from '../constants/metaData/sigIn'
import { PROPS_FIELDS_SIGN_IN } from '../constants/metaData/sigIn'
import { Authorization, AuthorizationProps, Chats, ChatsProps, ErrorPage, ErrorProps, Profile, ProfileProps } from '../pages'
import { getAllElementForm } from '../utils/getAllElementForm'
import { PROPS_BUTTON_REGISTRATION, PROPS_FIELDS_REGISTRATION } from '../constants/metaData/registration'
import { Block } from '../utils/Block'
import { CHATS_LIST, MENU_ADD_CONTENT_MESSAGE, MENU_CHANGE_FRIENDS } from '../constants/metaData/chats'
import { PROFILE_FIELDS, PROFILE_FIELDS_EDIT, PROFILE_FIELDS_PASSWORD } from '../constants/metaData/profile'

export enum ROUTE_LINK {
  HOME = '/',
  SIGN_IN = '/signin',
  REGISTRATION = '/registration',
  NOT_FOUND = '/notfound',
  SERVER_ERROR = '/servererror',
  CHATS = '/chats',
  PROFILE = '/profile',
  PROFILE_EDIT = '/profileedit',
  PROFILE_PASSWORD = '/profilepassword'
}

export const routePage = (): Block => {
  const isAuth = true // пока нет авторизации
  const path = (document.location.pathname).toLowerCase()
  console.log('pagePath = ', path)

  switch (path) {
    case ROUTE_LINK.HOME:
      return isAuth ? new Authorization(propsSignIn) : new Chats(propsChats)
    case ROUTE_LINK.SIGN_IN:
      return new Authorization(propsSignIn)
    case ROUTE_LINK.REGISTRATION:
      return new Authorization(propsRegistration)
    case ROUTE_LINK.SERVER_ERROR:
      return new ErrorPage(propsServerError)
    case ROUTE_LINK.CHATS:
      return new Chats(propsChats)
    case ROUTE_LINK.PROFILE:
      return new Profile(propsProfile)
    case ROUTE_LINK.PROFILE_EDIT:
      return new Profile(propsProfileEdit)
    case ROUTE_LINK.PROFILE_PASSWORD:
      return new Profile(propsProfilePassword)
    default:
      return new ErrorPage(propsNotFound)
  }
}

const propsSignIn: AuthorizationProps = {
  formName: 'signInForm',
  title: 'Вход',
  fieldsProps: PROPS_FIELDS_SIGN_IN,
  buttonProps: PROPS_BUTTON_SIGN_IN,
  linkData: {
    link: ROUTE_LINK.REGISTRATION,
    title: 'Нет аккаунта?'
  },
  events: {
    submit: getAllElementForm
  }
}


const propsRegistration: AuthorizationProps = {
  formName: 'registration',
  title: 'Регистрация',
  fieldsProps: PROPS_FIELDS_REGISTRATION,
  buttonProps: PROPS_BUTTON_REGISTRATION,
  linkData: {
    link: ROUTE_LINK.HOME,
    title: 'Войти'
  },
  events: {
    submit: getAllElementForm
  }
}

const propsServerError: ErrorProps = {
  title: "500",
  href: ROUTE_LINK.CHATS,
  text: "Мы уже фиксим",
  labelLink: "Назад к чатам"
}

const propsChats: ChatsProps = {
  chatsList: CHATS_LIST,
  subMenuAddContent: MENU_ADD_CONTENT_MESSAGE,
  subMenuChangeFriends: MENU_CHANGE_FRIENDS
}

const propsProfile: ProfileProps = {
  fields: PROFILE_FIELDS,
  typePage: 'info'
}

const propsProfileEdit: ProfileProps = {
  fields: PROFILE_FIELDS_EDIT,
  typePage: 'edit'
}

const propsProfilePassword: ProfileProps = {
  fields: PROFILE_FIELDS_PASSWORD,
  typePage: 'changePassword'
}

const propsNotFound: ErrorProps = {
  title: "404",
  href: ROUTE_LINK.CHATS,
  text: "Не туда попали",
  labelLink: "Назад к чатам"
}
