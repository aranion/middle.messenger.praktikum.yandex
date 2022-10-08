import template from './template.hbs'
import { Block } from '../../utils/Block'
import { ChatsLeftBox, ChatsRightBox } from '../../components'
import './styles.sass'
import ChatsController from '../../controllers/ChatsController'

export class Messenger extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.ChatsLeftBox = new ChatsLeftBox({})
    this.children.ChatsRightBox = new ChatsRightBox({})
  }

  render() {
    const props = this.getProps()

    ChatsController.fetchChats()

    return this.compile(template, {
      ...props,
    })
  }
}
