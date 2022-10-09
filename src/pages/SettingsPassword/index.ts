import { Block } from '../../utils/Block'
import { Profile } from '../../components'
import template from './template.hbs'
import './styles.sass'

export class SettingsPassword extends Block {
  constructor() {
    super()
  }

  protected init(): void {
    this.children.settingsEditPassword = new Profile({
      switchType: 'settingsEditPassword'
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
    })
  }
}
