import Router from './Router'
import { expect } from 'chai'
import { fake } from 'sinon'
import { Block } from '../utils/Block'

describe('Router', () => {

  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }

  const getContentFake = fake.returns(document.createElement('div'))

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as typeof Block

  it('use() should return Router instance', () => {
    const result = Router.use('/' as any, BlockMock)

    expect(result).to.eq(Router)
  })

  describe('.back()', () => {
    it('should render a page on history back action', () => {
      Router
        .use('/' as any, BlockMock)
        .start()

      Router.back()

      expect(getContentFake.callCount).to.eq(1)
    })
  })

  it('should render a page on start', () => {
    Router
      .use('/' as any, BlockMock)
      .start()

    expect(getContentFake.callCount).to.eq(1)
  })
})
