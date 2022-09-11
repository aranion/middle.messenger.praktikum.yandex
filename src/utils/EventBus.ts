export class EventBus<T extends string> {
  private readonly listeners: Partial<Record<T, Array<(...args: unknown[]) => void>>> = {};

  constructor() {
    this.listeners = {}
  }

  on(event: T, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event]?.push(callback)
  }

  off(event: T, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event]?.filter(
      listener => listener !== callback,
    )
  }

  emit(event: T, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event]?.forEach(function (listener) {
      listener(...args)
    })
  }
}
