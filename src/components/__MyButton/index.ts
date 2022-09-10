import { Block } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class MyButton extends Block<Props> {
  constructor(props: Props) {
    super(props)

    // this.element?.classList.add(`myButton`)
  }

  render() {
    return this.compile(template, { label: this.props.label })
  }
}

type Props = {
  label: string
  events?: { click: () => void }
}