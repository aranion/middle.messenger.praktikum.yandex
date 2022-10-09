import { Block } from '../utils/Block'
import { Query } from './Router'

export function renderContent(query: Query, block: Block) {

  const root = document.querySelector(query)
  const content = block.getContent()

  if (root === null) {
    throw new Error(`Error:: renderContent - root not found by selector '${query}'`)
  }

  if (content === null) {
    throw new Error('Error:: renderContent - content not found')
  }

  root.innerHTML = ''
  root.append(content)

  return root
}