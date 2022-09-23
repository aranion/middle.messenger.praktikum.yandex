import { Block } from '../utils/Block'
import { Query } from './Router'
import { renderContent } from './utils'

export class Route<R>  {
  private block: Block | null = null

  constructor(
    private pathname: R,
    private readonly blockClass: typeof Block,
    private readonly query: Query
  ) { }

  match(pathname: R) {
    return (pathname as string).toLowerCase() === (this.pathname as string).toLowerCase()
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