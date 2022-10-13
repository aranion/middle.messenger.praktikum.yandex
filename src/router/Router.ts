import { Block } from '../utils/Block'
import { Route } from './Route'
import { RouteLink } from './routeLink'

class Router<R extends string> {
  private static __instance: Router<any>
  private routes: Route[] = []
  private currentRoute: Route | null = null
  private history: History = window.history

  constructor(private readonly rootQuery: Query = '#root') {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    Router.__instance = this
  }

  public use(pathname: R, block: typeof Block) {
    const newRoute = new Route(pathname, block, this.rootQuery)

    this.routes.push(newRoute)

    return this
  }

  public start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window

      this._onRoute(target.location.pathname as R)
    })

    this._onRoute(window.location.pathname as R)
  }

  public go(pathname: R) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back() {
    this.history.back()
  }

  public forward() {
    this.history.forward()
  }

  private _getRoute(pathname: R) {
    return this.routes.find(route => route.match(pathname))
  }

  private _onRoute(pathname: R) {
    const route = this._getRoute(pathname)

    if (!route) {
      this.go('/NotFound' as R)
      return
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave()
    }

    this.currentRoute = route

    route.render()
  }
}

export default new Router<RouteLink>()

export type Query = keyof HTMLElementTagNameMap | string
