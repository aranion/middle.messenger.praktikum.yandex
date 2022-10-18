import { Block, DefaultProps } from '../../utils/Block'
import { SubMenuItem, SubMenuItemProps, Modal } from '../'
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

      const { modals } = this.getProps()

      if (!modals) {
        return
      }
      
      const { ModalAddUserChat, ModalDeleteUserChat } = modals
      const idButton = (e.currentTarget as HTMLButtonElement)?.id

      if (!idButton || !Modal || Array.isArray(Modal)) {
        return
      }

      this.setProps({ ...this.getProps(), isVisibleModal: true })

      switch (idButton) {
        case 'addUser':
          ModalAddUserChat.getContent()?.classList.remove('hidden')
          break
        case 'deleteUser':
          ModalDeleteUserChat.getContent()?.classList.remove('hidden')
          break
        default:
          break
      }
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
      isVisibleModal: true,
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
  modals?: {
    ModalAddUserChat: Modal,
    ModalDeleteUserChat: Modal
  }
  menuItems: SubMenuItemProps[]
  isVisibleModal?: boolean
}
