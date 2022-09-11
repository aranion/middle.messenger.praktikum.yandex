import { DefaultProps, Block } from './../../utils/Block'
import template from './template.hbs'

import './styles.sass'
import { Button } from '../../components/Button'

export class Modal extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected init(): void {
    this.children.Button = new Button({ label: this.props.btnLabel, buttonName: 'buttonModal' })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

type Props = DefaultProps & {
  title: string
  BodyElement: string
  btnLabel: string
  errorMessage: string
}
