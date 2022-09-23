import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import AarrowIcon from '../../assets/imgs/AarrowIcon.svg'
import './styles.sass'
import { PropsWithRouter, withRouter } from '../../hock/withRouter'
import { RouteLink } from '../../router/routeLink'

class BaseButtonCircle extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => this.navigate()
      }
    })
  }

  private navigate() {
    const { to, router } = this.getProps()

    if (to && router) {
      router.go(to)
    }
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      typeButton: 'button',
      direction: 'right',
      srcIcon: AarrowIcon,
      ...props,
    })
  }
}

export const ButtonCircle = withRouter<Props>(BaseButtonCircle)


type Props = DefaultProps & PropsWithRouter
  & {
    typeButton?: 'submit' | 'button'
    direction?: Direction
  to?: RouteLink
}

type Direction = 'left' | 'right'