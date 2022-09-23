import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class SubMenuItem extends Block<SubMenuItemProps> {
  constructor(props: SubMenuItemProps) {
    super(props)
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

export type SubMenuItemProps = DefaultProps & {
  rotateDeg?: number
  srcImg: string
  title: string
}
