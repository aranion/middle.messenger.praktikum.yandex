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
import { RouteLink } from './routeLink'

export const routePage = (): Block => {
  const isAuth = true // пока нет авторизации
  const path = (document.location.pathname).toLowerCase()

  switch (path) {
    case RouteLink.HOME:
      return isAuth ? new Authorization(propsSignIn) : new Chats(propsChats)
    case RouteLink.SIGN_IN:
      return new Authorization(propsSignIn)
    case RouteLink.REGISTRATION:
      return new Authorization(propsRegistration)
    case RouteLink.SERVER_ERROR:
      return new ErrorPage(propsServerError)
    case RouteLink.CHATS:
      return new Chats(propsChats)
    case RouteLink.PROFILE:
      return new Profile(propsProfile)
    case RouteLink.PROFILE_EDIT:
      return new Profile(propsProfileEdit)
    case RouteLink.PROFILE_PASSWORD:
      return new Profile(propsProfilePassword)
    default:
      return new ErrorPage(propsNotFound)
  }
}

export const Link = (link: keyof typeof RouteLink): void => {
  document.location.pathname = link.toLowerCase()
}