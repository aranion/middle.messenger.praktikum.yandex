import { MENU_ADD_CONTENT_MESSAGE, MENU_CHANGE_FRIENDS } from './../../constants/metaData/chats'
import {
  ModalSubMenu,
  ModalSubMenuProps,
  ChatRightBoxSubmit,
  Avatar,
  Message,
  Modal,
  BodyModalDeleteUserChat,
  BodyModalAddUserChat
} from './../'
import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { State } from '../../store'
import { withStore } from '../../hock/withStore'

export class BaseChatsRightBox extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  private createMessages(props: Props) {
    const { messenger, settings } = props

    if (messenger && settings) {
      const { messages, selectIdChat } = messenger
      const { user } = settings

      if (selectIdChat && user) {
        return messages[selectIdChat].map(data => new Message({
          ...data,
          isMyMessage: user.id === data.user_id
        }))
      }
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const Messages = this.createMessages(newProps)

    if (Messages) {
      this.children.Messages = Messages

      return true
    }

    console.log(oldProps, newProps)
    return false
  }

  protected init(): void {
    const Messages = this.createMessages(this.getProps())

    if (Messages) {
      this.children.Messages = Messages
    }

    this.children.ModalAddUserChat = new Modal({ BodyElement: BodyModalAddUserChat })
    this.children.ModalDeleteUserChat = new Modal({ BodyElement: BodyModalDeleteUserChat })
    this.children.AvatarInterlocutor = new Avatar({})
    this.children.ChatRightBoxSubmit = new ChatRightBoxSubmit({
      placeholder: 'Сообщение',
      required: true,
      id: 'message',
      typeField: 'text'
    })
    this.children.ModalSubMenuChangeFriends = new ModalSubMenu({
      ...MENU_CHANGE_FRIENDS,
      isVisibleModal: true,
      events: {
        click: (e) => {
          e.preventDefault()
          e.stopPropagation()

          const ModalSubMenuChangeFriends = this.children.ModalSubMenuChangeFriends as ModalSubMenu
          const props = ModalSubMenuChangeFriends.getProps() as ModalSubMenuProps

          if (!Array.isArray(ModalSubMenuChangeFriends)) {
            ModalSubMenuChangeFriends.setProps({
              ...props, isVisibleModal: !props.isVisibleModal, modals: {
                ModalAddUserChat: this.children.ModalAddUserChat as Modal,
                ModalDeleteUserChat: this.children.ModalDeleteUserChat as Modal,
              }
            })
          }
        }
      }
    })
    this.children.ModalSubMenuAddContent = new ModalSubMenu({
      ...MENU_ADD_CONTENT_MESSAGE,
      isVisibleModal: true,
      events: {
        click: (e) => {
          e.preventDefault()
          e.stopPropagation()

          const ModalSubMenuAddContent = this.children.ModalSubMenuAddContent as ModalSubMenu
          const props = ModalSubMenuAddContent.getProps() as ModalSubMenuProps

          if (!Array.isArray(ModalSubMenuAddContent)) {
            ModalSubMenuAddContent.setProps({ ...props, isVisibleModal: !props.isVisibleModal })
          }
        }
      }
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      isSelectChat: !!props.messenger?.selectIdChat,
      ...props
    })
  }
}

export const ChatsRightBox = withStore<Props>((state) => ({
  messenger: state.messenger,
  settings: state.settings,
}))(BaseChatsRightBox)

type Props = DefaultProps & Partial<State>
