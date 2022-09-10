import { Block, DefaultProps } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { SubMenuItem, SubMenuItemProps } from '../SubMenuItem'

export class ModalSubMenu extends Block<ModalSubMenuProps> {
  constructor(props: ModalSubMenuProps) {
    super(props)
  }

  protected init(): void {
    const { menuItems } = this.getProps()

    this.children.MenuItems = menuItems.map((menuItem) => {
      return new SubMenuItem({
        ...menuItem, events: {
          click: (e) => {
            console.log('Click', e)
          }
        }
      })
    })
  }

  render() {
    return this.compile(template, {
      ...this.props
    })
  }
}

export type ModalSubMenuProps = DefaultProps & {
  srcImgButton: string
  srcAltButton: string
  position: {
    top: string,
    bottom: string,
    left: string,
    right: string,
  }
  menuItems: SubMenuItemProps[]
}
