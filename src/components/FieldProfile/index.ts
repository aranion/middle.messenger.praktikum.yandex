import { Block, DefaultProps } from '../../utils/Block'
import { InputProps } from '../Input'
import template from './template.hbs'
import './styles.sass'

export class FieldProfile extends Block<FieldProfileProps> {
  constructor(props: FieldProfileProps) {
    super(props)
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

export type FieldProfileProps = DefaultProps & {
  label: string
  value?: string
  inputProps?: InputProps
}
