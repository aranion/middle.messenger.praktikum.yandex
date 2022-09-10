import { Block, DefaultProps } from '../../utils/Block'
import { Avatar } from '../'
import template from './template.hbs'
import './styles.sass'

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props)
  }

  protected init(): void {
    this.children.Avatar = new Avatar({})
  }

  render() {
    return this.compile(template, {
      linkChat: '#chat',
      ...this.props
    })
  }
}

export type ChatItemProps = DefaultProps & {
  srcAvatar?: string
  chatId: string
  linkChat?: string
  login: string
  lastMessage: string
  dateMessage: string
  newMessageCounter: string
} 

