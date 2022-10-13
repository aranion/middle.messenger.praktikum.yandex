import proxyquire from 'proxyquire'
import { expect } from 'chai'
import sinon from 'sinon'
import { Block } from './Block'

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
}

const { } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    }
  }
}) as { default: typeof Block }

describe('Block', () => {
  class ComponentMock extends Block { }

  it('should fire init event on initialization', () => {
    new ComponentMock({})

    expect(eventBusMock.emit.calledWith('init')).to.eq(false)
  })
})
