import { ChatItem, ChatItemProps } from './../ChatItem'
import { Block, DefaultProps } from '../../utils/Block'
import { RouteLink } from '../../router/routeLink'
import { Link } from '../Link'
import template from './template.hbs'
import './styles.sass'

export class ChatsLeftBox extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected init(): void {
    const { chatsList } = this.getProps()

    // this.children.ButtonCreateChat = new Button({
    //   buttonName: 'createChat',
    //   label: '+ Создать новый чат',
    //   classesList: ['chatsLeftBox__button']
    // })
    this.children.Link = new Link({ to: RouteLink.SETTINGS, label: 'Профиль' })
    this.children.ChatsList = chatsList.map((chat, tempKey) => {
      return new ChatItem({ ...chat, chatId: `${tempKey}` })
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

type Props = DefaultProps & {
  chatsList: ChatItemProps[]
}
