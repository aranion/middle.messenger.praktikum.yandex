import { ButtonCircle, InputMessage } from '../'
import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { State } from '../../store'
import { withStore } from '../../hock/withStore'
import WSController from '../../controllers/WSController'

export class BaseChatRightBoxSubmit extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          e.stopPropagation()

          const InputMessage = this.getChildren().InputMessage as InputMessage

          if (!Array.isArray(InputMessage)) {
            const newMessage = InputMessage.getValue()
            const { messenger } = this.getProps()

            if (messenger?.selectIdChat) {
              WSController.sendMEssage(messenger?.selectIdChat, newMessage)
              InputMessage.setProps({ value: '' })
            }
          }
        }
      }
    })
  }

  protected init(): void {
    this.children.InputMessage = new InputMessage({
      placeholder: 'Сообщение',
      required: true,
      id: 'message',
      typeField: 'text'
    })
    this.children.ButtonCircle = new ButtonCircle({
      typeButton: 'submit',

    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

export const ChatRightBoxSubmit = withStore<Props>((state) => ({
  messenger: state.messenger,
}))(BaseChatRightBoxSubmit)

type Props = DefaultProps & Partial<State>
