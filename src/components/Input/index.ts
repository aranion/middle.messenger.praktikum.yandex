import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import { TYPE_VALIDATE } from '../../utils/validateValue'
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
  fieldName?: keyof typeof TYPE_VALIDATE
  id?: string
  typeField?: keyof typeof TYPE_FIELD
  placeholder?: string
  required?: boolean
  classesList?: string[]
  value?: string
}

enum TYPE_FIELD {
  password = 'password',
  text = 'text',
  email = 'email',
  tel = 'tel',
}
