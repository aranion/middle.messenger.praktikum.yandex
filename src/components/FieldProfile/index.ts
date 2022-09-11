import { Block, DefaultProps } from '../../utils/Block'
import { InputProps } from '../Input'
import template from './template.hbs'
import './styles.sass'

export class FieldProfile extends Block<FieldProfileProps> {
  constructor(props: FieldProfileProps) {
    super(props)
  }

  render() {
    return this.compile(template, {
      ...this.props,
    })
  }
}

export type FieldProfileProps = DefaultProps & {
  label: string
  value?: string
  inputProps?: InputProps
}
