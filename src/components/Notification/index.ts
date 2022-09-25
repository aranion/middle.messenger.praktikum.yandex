import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class Notification extends Block<PropsNotification> {
  constructor(props: PropsNotification) {
    super(props)
    this.hide()
  }

  private showTimer() {
    const { message, timeShow = 2000 } = this.getProps()

    if (message !== '') {
      this.show()

      setTimeout(() => {
        this.hide()
      }, timeShow)
    }
  }

  render() {
    const { message, ...props } = this.getProps()

    this.showTimer()

    return this.compile(template, {
      message,
      isError: props.typeMessage === 'error',
      isAccess: props.typeMessage === 'access',
      ...props,
    })
  }
}

export type PropsNotification = DefaultProps & {
  message: string
  typeMessage?: TypeMessage
  timeShow?: number
}

type TypeMessage = 'error' | 'info' | 'access'