import { Block, DefaultProps } from '../../utils/Block'
import { Avatar } from '../'
import template from './template.hbs'
import './styles.sass'
import { Chats, State } from '../../store'
import { withStore } from '../../hock/withStore'

export class BaseChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props)
  }

  protected init(): void {
    this.children.Avatar = new Avatar({})
  }

  render() {
    const props = this.getProps()
    let time = ''

    if (props.last_message?.time) {
      const date = new Date(props.last_message.time)
      time = date.getHours() + ':' + date.getMinutes()
    }

    return this.compile(template, {
      isSelectedChat: props.messenger?.selectIdChat === props.id,
      time,
      ...props,
    })
  }
}

export const ChatItem = withStore<ChatItemProps>((state) => ({
  messenger: state.messenger,
}))(BaseChatItem)

export type ChatItemProps = DefaultProps & Partial<State> & Chats;

