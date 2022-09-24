import { DefaultProps, Block } from '../../utils/Block'
import template from './template.hbs'

import './styles.sass'
import { Button } from '../Button'

export class Modal extends Block<Props> {
  constructor(props: Props) {
    super(props)
    this.hide()

    this.element?.addEventListener('click', (e: Event) => {
      e.stopPropagation()

      const element = e.target as HTMLElement

      if (element.classList.value === 'modal') {
        this.hide()
      }
    })
  }

  protected init(): void {
    const { btnLabel } = this.getProps()

    this.children.Button = new Button({
      label: btnLabel,
      buttonName: 'buttonModal',
      events: {
        click: (e: Event) => {
          e.preventDefault()

          if (this.element) {
            const props = this.getProps()
            const inputAvatar = this.element.querySelector('#avatar') as HTMLInputElement
            const files = inputAvatar?.files

            if (files) {
              const isValide = files && files.length !== 0 && files[0]

              const setVisibleError = (isVisible: boolean) => {
                debugger
                this.setProps({
                  ...props,
                  error: {
                    ...props.error,
                    isVisible
                  },
                  events: {
                    click: (e) => {
                      e.stopPropagation()

                      const element = e.target as HTMLElement

                      if (element.classList.value === 'modal') {
                        this.hide()
                      }
                    }
                  }
                })
              }
              console.log(files)

              if (isValide) {
                if (props.error.isVisible) {
                  setVisibleError(false)
                }

                this.setProps({ ...props, file: files[0].name })

                const formData = new FormData()
                formData.append('avatar', files[0])

                // fench
                setTimeout(() => {
                  this.setProps({
                    ...props, title: 'Файл загружен', BodyElement: '', btnLabel: 'Закрыть', events: {
                      click: (e) => {
                        e.stopPropagation()

                        const element = e.target as HTMLElement

                        if (element.classList.value === 'modal') {
                          this.hide()
                        }
                      }
                    }
                  })
                  this.hide()
                }, 2000)

              } else {
                if (!props.error.isVisible) {
                  setVisibleError(true)
                }
              }
            }


          }

        }
      }
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

type Props = DefaultProps & {
  title: string
  BodyElement: string
  btnLabel: string
  error: ErrorMessageModal
  file?: string
}

type ErrorMessageModal = {
  message: string
  isVisible: boolean
}