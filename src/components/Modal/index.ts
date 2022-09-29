import { DefaultProps, Block } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { Button } from '../Button'
import UsersController from '../../controllers/UsersController'

export class Modal extends Block<Props> {
  constructor(props: Props) {
    super(props)
    this.hide()

    this.element?.addEventListener('click', (e: Event) => {
      e.stopPropagation()

      const element = e.target as HTMLElement

      if (element.classList.value === 'modal') {
        this.setProps({ ...this.props, error: null })
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

              const setError = (message: string | null) => {
                this.setProps({
                  ...props,
                  error: message,
                  events: {
                    click: (e) => {
                      e.stopPropagation()

                      const element = e.target as HTMLElement

                      if (element.classList.value === 'modal') {
                        this.setProps({ ...this.props, error: null })
                        this.hide()
                      }
                    }
                  }
                })
              }

              if (isValide) {
                if (props.error) {
                  setError(null)
                }

                this.setProps({ ...props, file: files[0].name })

                const formData = new FormData()

                formData.append('avatar', files[0])

                UsersController.putAvatar(formData)

              } else {
                if (!props.error) {
                  setError('Нужно выбрать файл')
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
  error: string | null
  file?: string
}
