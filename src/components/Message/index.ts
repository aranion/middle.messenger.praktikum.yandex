import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import checkReadingImg from '../../assets/imgs/ReadingIcon.svg'
import './styles.sass'
import { MessageState } from '../../store'

export class Message extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super(props)
  }

  render() {
    const props = this.getProps()

    const createDate = new Date(props.time)
    const createMessage = createDate.getHours() + ':' + createDate.getMinutes()

    return this.compile(template, {
      checkReadingImg,
      textMessage: props.content,
      createMessage,
      idMessage: props.id,
      ...props,
    })
  }
}

export type MessagesProps = DefaultProps & MessageState & { isMyMessage: boolean }
