import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class Button extends Block<PropsButton> {
  constructor(props: PropsButton) {
    super(props)
  }

  render() {
    return this.compile(template, {
      formName: '',
      typeButton: 'button',
      ...this.props,
    })
  }
}

export type PropsButton = DefaultProps & {
  label: string
  buttonName: string
  typeButton?: TypeButton
  formName?: string
}

type TypeButton = 'submit' | 'reset' | 'button' | 'menu'