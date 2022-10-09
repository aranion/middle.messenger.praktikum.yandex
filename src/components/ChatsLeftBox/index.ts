import { Block, DefaultProps } from '../../utils/Block'
import { RouteLink } from '../../router/routeLink'
import { Link, Modal, Button, BodyModalAddChat, ChatItem, Loader } from '../'
import template from './template.hbs'
import './styles.sass'
import { State, StateMessenger } from '../../store'
import { withStore } from '../../hock/withStore'
import ChatsController from '../../controllers/ChatsController'

export class BaseChatsLeftBox extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected componentDidUpdate(): boolean {
    const { messenger } = this.getProps()

    if (!messenger) {
      return false
    }

    this.children.ChatsList = this.createChatItem(messenger)

    return true
  }

  protected init(): void {
    const { messenger } = this.getProps()

    if (!messenger) {
      return
    }

    this.children.Loader = new Loader({})
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
    this.children.ButtonDeleteChat = new Button({
      buttonName: 'deleteChat',
      label: 'Удалить чат',
      classesList: ['chatsLeftBox__button'],
      events: {
        click: () => {
          ChatsController.deleteChat()
        }
      }
    })
    this.children.ChatsList = this.createChatItem(messenger)
  }

  private createChatItem(messenger: StateMessenger) {
    const { chats = [] } = messenger

    return chats.map((chat) => {
      return new ChatItem({
        ...chat,
        events: {
          click: () => {
            ChatsController.setSelectChat(chat.id)
          }
        }
      })
    })
  }

  render() {
    const props = this.getProps()
    const { messenger } = props

    return this.compile(template, {
      isLoading: messenger?.isLoading,
      isChatsListEmpty: messenger?.isChatsListEmpty,
      ...props,
    })
  }
}

export const ChatsLeftBox = withStore<Props>((state) => ({
  messenger: state.messenger,
}))(BaseChatsLeftBox)

type Props = DefaultProps & Partial<State>
