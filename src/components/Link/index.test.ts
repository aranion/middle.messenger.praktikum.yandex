import { Link } from './index'
import { expect } from 'chai'

describe('Link', () => {
  it('should render', () => {
    new Link({ to: '/' as any, label: '' })
  })

  it('element should return span', () => {
    const link = new Link({ to: '/' as any, label: '' })
    const element = link.element

    expect(element).to.be.instanceof(window.HTMLSpanElement)
  })
})
