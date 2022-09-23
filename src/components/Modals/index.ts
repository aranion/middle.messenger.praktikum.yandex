import { DefaultProps, Block } from './../../utils/Block'
import template from './template.hbs'

import './styles.sass'
import { Button } from '../../components/Button'

export class Modal extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected init(): void {
    const { btnLabel } = this.getProps()

    this.children.Button = new Button({ label: btnLabel, buttonName: 'buttonModal' })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, { ...props })
  }
}

type Props = DefaultProps & {
  title: string
  BodyElement: string
  btnLabel: string
  errorMessage: string
}
