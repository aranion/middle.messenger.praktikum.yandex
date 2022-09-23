import { Block } from '../../utils/Block'
import { Profile } from '../../components'
import template from './template.hbs'
import './styles.sass'

export class SettingsEdit extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.SettingsEdit = new Profile({
      switchType: 'settingsEditFields'
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}
