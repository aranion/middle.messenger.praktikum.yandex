import { EventBus } from "./EventBus"
import { nanoid } from 'nanoid'

export class Block<P extends DefaultProps = any> {
  static EVENTS = {
    INIT: "INIT",
    FLOW_CDM: "FLOW_CDM",
    FLOW_CDU: "FLOW_CDU",
    FLOW_RENDER: "FLOW_RENDER"
  } as const;

  public id: string = nanoid(6)
  protected props: P
  protected children: Children = {}
  private eventBus: () => EventBus<EventsList>
  private _element: HTMLElement | null = null

  /** JSDoc
   * @param {Object} propsWitchChildren
   *
   * @returns {void}
   */
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

  private _createResources() { }

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
    const self = this

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof typeof target]

        return typeof value === "function" ? value.bind(target) : value
      },
      set(newProps, prop, value) {
        const oldProps = { ...newProps }

        newProps[prop as keyof typeof newProps] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, newProps)
        return true
      },
      deleteProperty() {
        throw new Error("Нет доступа")
      }
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
    this._createResources()
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() { }

  protected componentDidMount(oldProps?: P) {
    console.log('componentDidMount =>', 'oldProps =', oldProps)
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    console.log('componentDidUpdate =>', 'oldProps =', oldProps, 'newProps =', newProps)
    return true
  }

  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

  protected show() {
    const element = this.getContent()

    if (element) {
      element.style.display = "block"
    }
  }

  protected hide() {
    const element = this.getContent()

    if (element) {
      element.style.display = "none"
    }
  }

  protected compile(template: TemplateDelegate, context: P & ContextTemplate) {
    const contextAndStubs = { ...context }

    // Замена компонента за заглушки
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        (contextAndStubs as ContextTemplate)[name] = component.map(item => `<div data-id="${item.id}"></div>`)
      } else {
        (contextAndStubs as ContextTemplate)[name] = `<div data-id="${component.id}"></div>`
      }
    })

    // Рендер шаблона с заглушками
    const stringHTML = template(contextAndStubs)

    // Перевод заглушки в HTML элементы
    const templateElement = document.createElement('template')
    templateElement.innerHTML = stringHTML

    // Заглушки заменяем на элементы
    Object.values(this.children).forEach((component) => {
      if (Array.isArray(component)) {
        component.forEach((item: Block) => {
          const stubs = templateElement.content.querySelector(`[data-id="${item.id}"]`)
          const contentElement = item.getContent()
          console.log('contentElement => ', contentElement, 'stubs =>', stubs)
          if (stubs && contentElement) {
            stubs.replaceWith(contentElement)
          }
        })
      } else {
        const stubs = templateElement.content.querySelector(`[data-id="${component.id}"]`)
        const contentElement = component.getContent()
        console.log('contentElement => ', contentElement, 'stubs =>', stubs)
        if (stubs && contentElement) {
          stubs.replaceWith(contentElement)
        }
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
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  public getContent() {
    return this.element
  }

  public getProps() {
    return this.props
  }

}

export interface DefaultProps {
  events?: { [key in keyof HTMLElementEventMap]?: EventListenerOrEventListenerObject }
}

type Children = Record<string, Block | Block[]>
type ContextTemplate = Record<string, unknown>
type TemplateDelegate = (context: ContextTemplate) => string
type EventsList = keyof typeof Block.EVENTS