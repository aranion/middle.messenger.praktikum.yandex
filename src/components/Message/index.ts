import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import checkReadingImg from '../../assets/imgs/ReadingIcon.svg'
import './styles.sass'

export class Message extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super(props)
  }
  render() {
    return this.compile(template, {
      ...this.props,
      checkReadingImg
    })
  }
}

export type MessagesProps = DefaultProps & {
  myMessageFlag: boolean
  textMessage: string
  createMessage: string
  idMessage: number
}
