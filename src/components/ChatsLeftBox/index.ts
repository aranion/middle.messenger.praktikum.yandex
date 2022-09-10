import { ChatItem, ChatItemProps } from './../ChatItem'
import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import arrowLinkImg from '../../assets/imgs/PolygonIcon.svg'
import searchIconImg from '../../assets/imgs/SearchIcon.svg'
import './styles.sass'
import { ROUTE_LINK } from '../../router/routePage'

export class ChatsLeftBox extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected init(): void {
    const { chatsList } = this.getProps()

    this.children.ChatsList = chatsList.map((chat, tempKey) => {
      return new ChatItem({ ...chat, chatId: `${tempKey}` })
    })
  }

  render() {
    return this.compile(template, {
      ...this.props,
      arrowLinkImg,
      searchIconImg,
      profileLink: ROUTE_LINK.PROFILE
    })
  }
}

type Props = DefaultProps & {
  chatsList: ChatItemProps[]
} 
