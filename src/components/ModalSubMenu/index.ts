import { Block, DefaultProps } from '../../utils/Block'
import { SubMenuItem, SubMenuItemProps } from '../SubMenuItem'
import template from './template.hbs'
import './styles.sass'

export class ModalSubMenu extends Block<ModalSubMenuProps> {
  constructor(props: ModalSubMenuProps) {
    super(props)
  }

  protected init(): void {
    const { menuItems } = this.getProps()

    const handleClickSubMenu = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()

      console.log('Click', e)
    }

    this.children.MenuItems = menuItems.map((menuItem) => {
      return new SubMenuItem({
        ...menuItem,
        events: {
          click: handleClickSubMenu
        },
      })
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      ...props,
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
  isVisibleModal: boolean
}
