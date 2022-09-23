import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { Link, LinkProps } from '../Link'
import { RouteLink } from '../../router/routeLink'


export class ErrorPage extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super(props)
  }

  protected init(): void {
    const { linkData } = this.getProps()

    this.children.Link = new Link(linkData)
  }

  render() {
    const props = this.getProps()

    return this.compile(template, { ...props })
  }
}

export type ErrorProps = DefaultProps & {
  title: string
  text: string
  linkData: LinkProps<RouteLink>
}