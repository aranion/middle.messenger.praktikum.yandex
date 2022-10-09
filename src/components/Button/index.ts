import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class Button extends Block<PropsButton> {
  constructor(props: PropsButton) {
    super(props)
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      formName: '',
      typeButton: 'button',
      classes: props.classesList?.join(' '),
      ...props,
    })
  }
}

export type PropsButton = DefaultProps & {
  label: string
  buttonName: string
  typeButton?: TypeButton
  formName?: string
  classesList?: string[]
}

type TypeButton = 'submit' | 'reset' | 'button' | 'menu'