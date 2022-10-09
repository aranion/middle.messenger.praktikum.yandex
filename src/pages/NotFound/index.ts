import { Block } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { RouteLink } from '../../router/routeLink'
import { ErrorPage } from '../../components'


export class NotFound extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.NotFound = new ErrorPage({
      title: '404',
      text: 'Не туда попали',
      linkData: {
        to: RouteLink.MESSENGER,
        label: 'Назад к чатам',
      }
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, { ...props })
  }
}
