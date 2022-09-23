import { ChatItem, ChatItemProps } from './../ChatItem'
import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import arrowLinkImg from '../../assets/imgs/PolygonIcon.svg'
import searchIconImg from '../../assets/imgs/SearchIcon.svg'
import './styles.sass'
import { RouteLink } from '../../router/routeLink'
import { Link } from '../Link'

export class ChatsLeftBox extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected init(): void {
    const { chatsList } = this.getProps()

    this.children.Link = new Link({ to: RouteLink.SETTINGS, label: 'Профиль' })
    this.children.ChatsList = chatsList.map((chat, tempKey) => {
      return new ChatItem({ ...chat, chatId: `${tempKey}` })
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
      arrowLinkImg,
      searchIconImg,
    })
  }
}

type Props = DefaultProps & {
  chatsList: ChatItemProps[]
}
