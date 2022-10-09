import { MonitorStore } from './components/MonitorStore/index'
import './assets/normalize.sass'
import { Notification } from './components'
import AuthController from './controllers/AuthController'
import './index.sass'
import { Messenger, NotFound, ServerError, SignIn, SignUp, Settings, SettingsEdit, SettingsPassword } from './pages'
import { RouteLink } from './router/routeLink'
import Router from './router/Router'
import store from './store'

(window as any).store = store

window.addEventListener('DOMContentLoaded', async () => {
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


  try {
    await AuthController.fetchUser()
    Router.start()
    Router.go(RouteLink.MESSENGER)
  } catch (error) {
    Router.go(RouteLink.HOME)
    store.set('notification', { message: 'Требуется авторизация' })
  }

  const root = document.querySelector('#root')
  const notification = new Notification({}).getContent()
  const monitorStore = new MonitorStore({}).getContent()

  if (root && notification && monitorStore) {
    root.after(notification)
    root.after(monitorStore)
  }

})