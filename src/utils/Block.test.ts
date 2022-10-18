import proxyquire from 'proxyquire'
import { expect } from 'chai'
import { fake } from 'sinon'
import { Block as BlockCls } from './Block'

const eventBusMock = {
  on: fake(),
  emit: fake(),
}

const { Block }: any = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    }
  }
}) as { default: typeof BlockCls }

describe('Block', () => {
  class ComponentMock extends Block { }

  it('should fire init event on initialization', () => {
    new ComponentMock()

    expect(eventBusMock.emit.calledWith('init')).to.eq(false)
  })
})
