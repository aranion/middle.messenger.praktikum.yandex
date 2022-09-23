import { Block } from '../../utils/Block'
import { Profile } from '../../components'
import template from './template.hbs'
import './styles.sass'

export class Settings extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.Settings = new Profile({
      switchType: 'settingsInfo'
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}

