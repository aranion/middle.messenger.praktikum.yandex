import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import { TypeValidate } from '../../utils/validateValue'
import './styles.sass'

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props)
  }

  render() {
    return this.compile(template, {
      isInvisible: true,
      classes: this.props.classesList?.join(' '),
      ...this.props,
    })
  }
}

export type InputProps = DefaultProps & {
  fieldName?: keyof typeof TypeValidate
  id?: string
  typeField?: keyof typeof TypeField
  placeholder?: string
  required?: boolean
  classesList?: string[]
  value?: string
}

enum TypeField {
  password = 'password',
  text = 'text',
  email = 'email',
  tel = 'tel',
}
