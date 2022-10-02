import { Block, DefaultProps } from '../../utils/Block'
import { RouteLink } from '../../router/routeLink'
import { Link, Modal, Button, BodyModalAddChat, ChatItem } from '../'
import template from './template.hbs'
import './styles.sass'
import { State } from '../../store'
import { withStore } from '../../hock/withStore'

export class BaseChatsLeftBox extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected componentDidUpdate(): boolean {
    const { chats = [] } = this.getProps()

    this.children.ChatsList = chats.map((chat) => {
      return new ChatItem({ ...chat })
    })

    return true
  }

  protected init(): void {
    const { chats = [] } = this.getProps()

    this.children.Link = new Link({ to: RouteLink.SETTINGS, label: 'Профиль' })
    this.children.Modal = new Modal({ BodyElement: BodyModalAddChat })
    this.children.ButtonCreateChat = new Button({
      buttonName: 'createChat',
      label: 'Создать чат',
      classesList: ['chatsLeftBox__button'],
      events: {
        click: () => {
          const Modal = this.getChildren().Modal

          if (!Array.isArray(Modal)) {
            const element = Modal.getContent()

            element?.classList.remove('hidden')
          }
        }
      }
    })
    this.children.ChatsList = chats.map((chat) => {
      return new ChatItem({ ...chat })
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

export const ChatsLeftBox = withStore<Props>((state) => ({
  chats: state.chats,
}))(BaseChatsLeftBox)

type Props = DefaultProps & Partial<State> 
