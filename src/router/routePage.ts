import { Authorization, Chats, ErrorPage, Profile } from '../pages'
import { Block } from '../utils/Block'
import {
  propsChats,
  propsNotFound,
  propsProfile,
  propsProfileEdit,
  propsProfilePassword,
  propsRegistration,
  propsServerError,
  propsSignIn,
} from '../constants/metaData/propsPages'
import { ROUTE_LINK } from './routeLink'

export const routePage = (): Block => {
  const isAuth = true // пока нет авторизации
  const path = (document.location.pathname).toLowerCase()

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

export const Link = (link: keyof typeof ROUTE_LINK): void => {
  document.location.pathname = link.toLowerCase()
}