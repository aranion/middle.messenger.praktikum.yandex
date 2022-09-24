import { EventBus } from './EventBus'
import { nanoid } from 'nanoid'

export class Block<P extends DefaultProps = any> {
  static EVENTS = {
    INIT: 'INIT',
    FLOW_CDM: 'FLOW_CDM',
    FLOW_CDU: 'FLOW_CDU',
    FLOW_RENDER: 'FLOW_RENDER',
  } as const;

  public id: string = nanoid(6);
  private props: P
  protected children: Children = {};
  private eventBus: () => EventBus<EventsList>
  private _element: HTMLElement | null = null;

  constructor(propsWitchChildren = {}) {
    const eventBus = new EventBus<EventsList>()
    const { props, children } = this._getChildrenAndProps(propsWitchChildren)

    this.children = children
    this.props = this._makePropsProxy(props)
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  private _addEvents() {
    const { events = {} } = this.props
    const eventsKeys = Object.keys(events) as unknown as (keyof HTMLElementEventMap)[]

    eventsKeys.forEach(eventName => {
      if (events[eventName]) {
        this._element?.addEventListener(eventName, events[eventName] as EventListenerOrEventListenerObject)
      }
    })
  }

  private _registerEvents(eventBus: EventBus<EventsList>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _componentDidMount() {
    this.componentDidMount()
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps)

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  private _render() {
    const fragment = this.render()
    const newElement = fragment.firstElementChild as HTMLElement | null

    if (newElement) {
      this._element?.replaceWith(newElement)
      this._element = newElement
      this._addEvents()
    }
  }

  private _makePropsProxy(props: P) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop as keyof typeof target]

        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (newProps, prop, value) => {
        const oldProps = { ...newProps }

        newProps[prop as keyof typeof newProps] = value

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, newProps)
        return true
      },
      deleteProperty: () => {
        throw new Error('Нет доступа')
      },
    })
  }

  private _getChildrenAndProps(childrenAndProps: Children | P): { props: P, children: Children } {
    const props: any = {}
    const children: Children = {}

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }

  private _init() {
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() { }

  protected componentDidMount() { }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    if (oldProps === newProps) {
      console.log('oldProps =', oldProps, 'newProps =', newProps)
    }

    return true
  }

  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

  protected compile(template: TemplateDelegate, context: P & ContextTemplate) {
    const contextAndStubs = { ...context } as ContextTemplate

    const prepareContent = (id: string) => {
      return `<div data-id="${id}"></div>`
    }

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(item => prepareContent(item.id))
      } else {
        contextAndStubs[name] = prepareContent(component.id)
      }
    })

    const stringHTML = template(contextAndStubs)
    const templateElement = document.createElement('template')

    templateElement.innerHTML = stringHTML

    const prepareElement = (item: Block) => {
      const stubs = templateElement.content.querySelector(`[data-id="${item.id}"]`)
      const contentElement = item.getContent()

      if (stubs && contentElement) {
        stubs.replaceWith(contentElement)
      }
    }

    Object.values(this.children).forEach((component) => {
      if (Array.isArray(component)) {
        component.forEach((item: Block) => {
          prepareElement(item)
        })
      } else {
        prepareElement(component)
      }

    })
    return templateElement.content
  }

  protected get element() {
    return this._element
  }

  public setProps = (nextProps: P) => {
    if (nextProps) {
      Object.assign(this.props, nextProps)
    }
  };

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  public getChildren() {
    return this.children
  }

  public getContent() {
    return this.element
  }

  public getProps() {
    return this.props
  }

  public show(displayType: CssDisplayType = 'block') {
    const element = this.getContent()

    if (element) {
      element.style.display = displayType
    }
  }

  public hide() {
    const element = this.getContent()

    if (element) {
      element.style.display = 'none'
    }
  }
}

export interface DefaultProps {
  events?: { [key in keyof HTMLElementEventMap]?: EventListenerOrEventListenerObject }
}

type Children = Record<string, Block | Block[]>
type ContextTemplate = Record<string, unknown>
type TemplateDelegate = (context: ContextTemplate) => string
type EventsList = keyof typeof Block.EVENTS
type CssDisplayType = 'block'
  | 'inline'
  | 'flex'
  | 'grid'
  | 'inline-bloc'
  | 'inline-flex'
  | 'inline-grid'

