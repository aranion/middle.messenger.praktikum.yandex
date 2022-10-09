import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class InputMessage extends Block<InputMessageProps> {
  constructor(props: InputMessageProps) {
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
    const props = this.getProps()

    return this.compile(template, {
      isInvisible: true,
      ...props,
    })
  }
}

type InputMessageProps = DefaultProps & {
  id?: string
  typeField?: keyof typeof TypeField
  placeholder?: string
  required?: boolean
  value?: string
}

enum TypeField {
  password = 'password',
  text = 'text',
  email = 'email',
  tel = 'tel',
}
