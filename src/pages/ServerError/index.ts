import { Block } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { RouteLink } from '../../router/routeLink'
import { ErrorPage } from '../../components'


export class ServerError extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.ServerError = new ErrorPage({
      title: '500',
      text: 'Мы уже фиксим',
      linkData: {
        to: RouteLink.MESSENGER,
        label: 'Назад к чатам'
      }
    }
    )
  }

  render() {
    const props = this.getProps()

    return this.compile(template, { ...props })
  }
}
