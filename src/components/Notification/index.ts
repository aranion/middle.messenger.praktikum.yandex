import { StateNotification } from './../../store/index'
import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { withStore } from '../../hock/withStore'
import store, { State } from '../../store'

export class BaseNotification extends Block<PropsNotification> {
  constructor(props: PropsNotification) {
    super({ ...props })
  }

  render() {
    const { notification } = this.props
    let classes = notification?.typeMessage === 'error'
      ? 'notification__error'
      : notification?.typeMessage === 'success'
        ? 'notification__access'
        : ' '


    if (notification?.message && notification?.message !== '') {
      const { timeShow = 3000 } = notification as StateNotification

      this.show()

      setTimeout(() => {
        this.hide()
        store.set('notification', { message: null, title: null, typeMessage: 'info' })
      }, timeShow)
    } else {
      classes += ' hidden'
    }

    return this.compile(template, {
      classes,
      message: notification?.message,
      title: notification?.title,
      ...this.props,
    })
  }
}

export const Notification = withStore<PropsNotification>(state => ({
  notification: state.notification
}))(BaseNotification)

export type PropsNotification = DefaultProps & Partial<State> 
