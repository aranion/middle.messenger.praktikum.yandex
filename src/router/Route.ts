import { Block } from '../utils/Block'
import { Query } from './Router'
import { renderContent } from './utils'

export class Route {
  private block: Block | null = null

  constructor(
    private pathname: string,
    private readonly blockClass: typeof Block,
    private readonly query: Query
  ) { }

  match(pathname: string) {
    return pathname.toLowerCase() === this.pathname.toLowerCase()
  }

  render() {
    const isNotExistBlock = !this.block

    if (isNotExistBlock) {
      this.block = new this.blockClass({})

      renderContent(this.query, this.block)
      return
    }
  }

  leave() {
    this.block = null
  }
}