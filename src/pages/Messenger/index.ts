import { CHATS_LIST, MENU_ADD_CONTENT_MESSAGE, MENU_CHANGE_FRIENDS, META_MESSAGES } from '../../constants/metaData/chats'
import { ModalSubMenu, ModalSubMenuProps } from '../../components/ModalSubMenu/index'
import template from './template.hbs'
import { Block } from '../../utils/Block'
import { Avatar, ButtonCircle, ChatsLeftBox, Message } from '../../components'
import './styles.sass'

export class Messenger extends Block {
  constructor() {
    super()
  }

  handleShowModal = (Element: ModalSubMenu) => {
    const props = Element.getProps() as ModalSubMenuProps

    if (!Array.isArray(Element)) {
      Element.setProps({ ...props, isVisibleModal: !props.isVisibleModal })
    }

  }

  protected init(): void {
    this.children.AvatarInterlocutor = new Avatar({})
    this.children.ButtonCircle = new ButtonCircle({ typeButton: 'submit' })
    this.children.ChatsLeftBox = new ChatsLeftBox({ chatsList: [...CHATS_LIST] })
    this.children.Messages = META_MESSAGES.map((message) => {
      return new Message({ ...message })
    })
    this.children.ModalSubMenuAddContent = new ModalSubMenu({
      ...MENU_ADD_CONTENT_MESSAGE,
      isVisibleModal: false,
      events: {
        click: () => {
          const ModalSubMenuAddContent = this.children.ModalSubMenuAddContent as ModalSubMenu

          this.handleShowModal(ModalSubMenuAddContent)
        }
      }
    })
    this.children.ModalSubMenuChangeFriends = new ModalSubMenu({
      ...MENU_CHANGE_FRIENDS,
      isVisibleModal: false,
      events: {
        click: () => {
          const ModalSubMenuChangeFriends = this.children.ModalSubMenuChangeFriends as ModalSubMenu

          this.handleShowModal(ModalSubMenuChangeFriends)
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
