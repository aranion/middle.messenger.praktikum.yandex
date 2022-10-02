import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import { TypeValidate } from '../../utils/validateValue'
import './styles.sass'

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props)
  }

  public getName() {
    const Element = this.element as HTMLInputElement | null

    if (Element) {
      return Element.name
    } else {
      throw new Error('Input элемент не найден, name не доступно')
    }
  }

  public getValue() {
    const Element = this.element as HTMLInputElement | null

    if (Element) {
      return Element.value
    } else {
      throw new Error('Input элемент не найден, value не доступно')
    }
  }

  render() {
    const { classesList, ...props } = this.getProps()

    return this.compile(template, {
      isInvisible: true,
      classes: classesList?.join(' ') || '',
      ...props,
    })
  }
}

export type InputProps = DefaultProps & {
  fieldName?: keyof typeof TypeValidate | string
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
