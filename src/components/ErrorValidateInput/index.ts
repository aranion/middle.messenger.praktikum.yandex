import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class ErrorValidateInput extends Block<PropsErrorValidateInput> {
  constructor(props: PropsErrorValidateInput) {
    super(props)
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      isInvisible: true,
      ...props,
    })
  }
}

export type PropsErrorValidateInput = DefaultProps & {
  errorMessage: string
  isInvisible?: boolean
}
