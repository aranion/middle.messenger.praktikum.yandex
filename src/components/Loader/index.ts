import { DefaultProps, Block } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class Loader extends Block<LoaderProps> {

  constructor(props: LoaderProps) {
    super(props)
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

export type LoaderProps = DefaultProps & {
  isLight?: boolean
}
