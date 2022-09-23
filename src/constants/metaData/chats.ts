import MenuIcon from '../../assets/imgs/MenuIcon.svg'
import CrossIcon from '../../assets/imgs/CrossIcon.svg'
import AttachIcon from '../../assets/imgs/AttachIcon.svg'
import PhotoIcon from '../../assets/imgs/PhotoIcon.svg'
import AddFileIcon from '../../assets/imgs/AddFileIcon.svg'
import AddLocationIcon from '../../assets/imgs/AddLocationIcon.svg'
import { ChatItemProps, MessagesProps, ModalSubMenuProps } from '../../components'

export const CHATS_LIST: ChatItemProps[] = [
  { srcAvatar: 'src', login: 'User1', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '2', chatId: '1' },
  { srcAvatar: 'src', login: 'User2', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '2', chatId: '2' },
  { srcAvatar: 'src', login: 'User3', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '2', chatId: '3' },
  { srcAvatar: 'src', login: 'User4', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '2', chatId: '4' },
  { srcAvatar: 'src', login: 'User5', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '2', chatId: '5' },
  { srcAvatar: 'src', login: 'User6', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '2', chatId: '6' },
  { srcAvatar: 'src', login: 'User7', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '2', chatId: '7' },
  { srcAvatar: 'src', login: 'User8', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '4', chatId: '8' },
  { srcAvatar: 'src', login: 'User9', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '1', chatId: '9' },
  { srcAvatar: 'src', login: 'User10', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '2', chatId: '11' },
  { srcAvatar: 'src', login: 'User11', lastMessage: '...', dateMessage: '00:00', newMessageCounter: '2', chatId: '11' },
]

export const MENU_CHANGE_FRIENDS: Omit<ModalSubMenuProps, 'isVisibleModal'> = {
  srcImgButton: MenuIcon,
  srcAltButton: 'Изменение статуса',
  position: { top: '50px', right: '0px', left: 'auto', bottom: 'auto' },
  menuItems: [
    { srcImg: CrossIcon, title: 'Добавить пользователя' },
    { srcImg: CrossIcon, title: 'Удалить пользователя', rotateDeg: 45 },
  ],
}

export const MENU_ADD_CONTENT_MESSAGE: Omit<ModalSubMenuProps, 'isVisibleModal'> = {
  srcImgButton: AttachIcon,
  srcAltButton: 'Прикрепить',
  position: { top: '-150px', left: '-20px', right: 'auto', bottom: 'auto' },
  menuItems: [
    { srcImg: PhotoIcon, title: 'Фото или Видео' },
    { srcImg: AddFileIcon, title: 'Файл' },
    { srcImg: AddLocationIcon, title: 'Локация' },
  ],
}

export const META_MESSAGES: MessagesProps[] = [
  {
    textMessage: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент',
    createMessage: '11:56',
    myMessageFlag: false,
    idMessage: 1,
  },
  { textMessage: 'img', createMessage: '11:52', myMessageFlag: false, idMessage: 2 },
  { textMessage: 'КРУТо!', createMessage: '11:52', myMessageFlag: true, idMessage: 3 },
  {
    textMessage: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент',
    createMessage: '11:56',
    myMessageFlag: false,
    idMessage: 4,
  },
  { textMessage: 'Ага!', createMessage: '11:52', myMessageFlag: true, idMessage: 5 },
]