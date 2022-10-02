import { DefaultProps, Block } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class Modal extends Block<Props> {
  constructor(props: Props) {
    super(props)

    if (this.element) {
      const elementClose = this.element.querySelector('.modal__close')

      if (elementClose) {
        elementClose.addEventListener('click', e => {
          e.stopPropagation()
          e.preventDefault()

          const element = e.target as HTMLElement

          if (element.parentNode) {
            (element.parentNode.parentNode as HTMLDivElement).classList.add('hidden')
          }
        })
      }

    }

  }

  protected init(): void {
    const { BodyElement } = this.getProps()

    this.children.BodyElement = new BodyElement({})
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

type Props = DefaultProps & {
  BodyElement: typeof Block<any>
}
