import { Block, DefaultProps } from '../../utils/Block'
import { Avatar } from '../'
import template from './template.hbs'
import './styles.sass'
import { ChatsState } from '../../store'

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props)
  }

  protected init(): void {
    this.children.Avatar = new Avatar({})
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

export type ChatItemProps = DefaultProps & ChatsState;

