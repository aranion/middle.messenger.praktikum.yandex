import MenuIcon from '../../assets/imgs/MenuIcon.svg'
import CrossIcon from '../../assets/imgs/CrossIcon.svg'
import AttachIcon from '../../assets/imgs/AttachIcon.svg'
import PhotoIcon from '../../assets/imgs/PhotoIcon.svg'
import AddFileIcon from '../../assets/imgs/AddFileIcon.svg'
import AddLocationIcon from '../../assets/imgs/AddLocationIcon.svg'
import { ModalSubMenuProps } from '../../components'

export const MENU_CHANGE_FRIENDS: Omit<ModalSubMenuProps, 'isVisibleModal' | 'modals'> = {
  srcImgButton: MenuIcon,
  srcAltButton: 'Изменение статуса',
  position: { top: '50px', right: '0px', left: 'auto', bottom: 'auto' },
  menuItems: [
    { typeButton: 'addUser', srcImg: CrossIcon, title: 'Добавить пользователя' },
    { typeButton: 'deleteUser', srcImg: CrossIcon, title: 'Удалить пользователя', rotateDeg: 45 },
  ],
}

export const MENU_ADD_CONTENT_MESSAGE: Omit<ModalSubMenuProps, 'isVisibleModal' | 'modals'> = {
  srcImgButton: AttachIcon,
  srcAltButton: 'Прикрепить',
  position: { top: '-150px', left: '-20px', right: 'auto', bottom: 'auto' },
  menuItems: [
    { typeButton: 'addContent', srcImg: PhotoIcon, title: 'Фото или Видео' },
    { typeButton: 'addFiles', srcImg: AddFileIcon, title: 'Файл' },
    { typeButton: 'addLocation', srcImg: AddLocationIcon, title: 'Локация' },
  ],
}
