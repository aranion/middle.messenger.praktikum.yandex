import Router from '../router/Router'
import { Block, DefaultProps } from '../utils/Block'

export function withRouter<T>(Component: typeof Block<T & DefaultProps>) {

  type Props = typeof Component extends typeof Block<infer P extends DefaultProps> ? P : T


  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter ) {
      super({ ...props, router: Router })
    }
  }
}

export interface PropsWithRouter {
  router?: typeof Router
}