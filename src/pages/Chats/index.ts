import { META_MESSAGES } from '../../constants/metaData/chats'
import { ModalSubMenu, ModalSubMenuProps } from './../../components/ModalSubMenu/index'
import template from './template.hbs'
import { Block, DefaultProps } from '../../utils/Block'
import { Avatar, ButtonCircle, ChatItemProps, ChatsLeftBox, Message } from '../../components'
import './styles.sass'

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super(props)
  }

  protected init(): void {
    const { chatsList, subMenuAddContent, subMenuChangeFriends } = this.getProps()

    this.children.ChatsLeftBox = new ChatsLeftBox({ chatsList })
    this.children.AvatarInterlocutor = new Avatar({})
    this.children.ButtonCircle = new ButtonCircle({ alt: 'Отправить сообщение', typeButton: 'submit' })
    this.children.ModalSubMenuAddContent = new ModalSubMenu({ ...subMenuAddContent })
    this.children.ModalSubMenuChangeFriends = new ModalSubMenu({ ...subMenuChangeFriends })
    this.children.Messages = META_MESSAGES.map((message) => {
      return new Message({ ...message })
    })
  }

  render() {
    return this.compile(template, {
      ...this.props,
    })
  }
}

export type ChatsProps = DefaultProps & {
  chatsList: ChatItemProps[]
  subMenuAddContent: ModalSubMenuProps
  subMenuChangeFriends: ModalSubMenuProps
} 
