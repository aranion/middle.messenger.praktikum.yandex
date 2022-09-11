import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class ErrorValidateInput extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return this.compile(template, {
      isInvisible: true,
      ...this.props,
    })
  }
}

type Props = DefaultProps & {
  errorMessage: string
  isInvisible?: boolean
}
