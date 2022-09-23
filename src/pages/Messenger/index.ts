import { CHATS_LIST, MENU_ADD_CONTENT_MESSAGE, MENU_CHANGE_FRIENDS, META_MESSAGES } from '../../constants/metaData/chats'
import { ModalSubMenu } from '../../components/ModalSubMenu/index'
import template from './template.hbs'
import { Block } from '../../utils/Block'
import { Avatar, ButtonCircle, ChatsLeftBox, Message } from '../../components'
import './styles.sass'

export class Messenger extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.ChatsLeftBox = new ChatsLeftBox({ chatsList: [...CHATS_LIST] })
    this.children.AvatarInterlocutor = new Avatar({})
    this.children.ButtonCircle = new ButtonCircle({ typeButton: 'submit' })
    this.children.ModalSubMenuAddContent = new ModalSubMenu({ ...MENU_ADD_CONTENT_MESSAGE })
    this.children.ModalSubMenuChangeFriends = new ModalSubMenu({ ...MENU_CHANGE_FRIENDS })
    this.children.Messages = META_MESSAGES.map((message) => {
      return new Message({ ...message })
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}
