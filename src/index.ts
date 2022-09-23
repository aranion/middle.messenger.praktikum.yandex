import './assets/normalize.sass'
import './index.sass'
import { Messenger, NotFound, ServerError, SignIn, SignUp, Settings, SettingsEdit, SettingsPassword } from './pages'
import { RouteLink } from './router/routeLink'
import Router from './router/Router'

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use(RouteLink.HOME, SignIn)
    .use(RouteLink.SIGN_IN, SignIn)
    .use(RouteLink.SIGN_UP, SignUp)
    .use(RouteLink.MESSENGER, Messenger)
    .use(RouteLink.SETTINGS, Settings)
    .use(RouteLink.SETTINGS_EDIT, SettingsEdit)
    .use(RouteLink.SETTINGS_PASSWORD, SettingsPassword)
    .use(RouteLink.NOT_FOUND, NotFound)
    .use(RouteLink.SERVER_ERROR, ServerError)
    .start()
})