import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class Avatar extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const props = this.getProps()

    return this.compile(template, { ...props })
  }
}

type Props = DefaultProps & {
  srcAvatar?: string
}