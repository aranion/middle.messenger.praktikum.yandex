import { PropsWithRouter, withRouter } from '../../hock/withRouter'
import { RouteLink } from '../../router/routeLink'
import { Block } from '../../utils/Block'
import template from './template.hbs'

class BaseLink<T extends RouteLink> extends Block<LinkProps<T>> {
  constructor(props: LinkProps<string>) {
    super({
      ...props,
      events: {
        click: () => {
          if (props.events && props.events.click) {
            props.events.click()
          }

          this.navigate()
        }
      }
    })
  }

  navigate() {
    const { router, to } = this.getProps()

    router?.go(to)
  }

  render() {
    const props = this.getProps()

    return this.compile(template, { ...props })
  }
}

export const Link = withRouter<LinkProps<RouteLink>>(BaseLink)

export interface LinkProps<T> extends PropsWithRouter {
  to: T
  label: string
  events?: {
    click: () => void
  }
}