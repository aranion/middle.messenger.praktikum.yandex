import { DefaultProps, Block } from '../../utils/Block'
import { Button, Input } from '..'
import { ItemSearchList } from '../ItemSearchList'
import { State } from '../../store'
import { withStore } from '../../hock/withStore'
import ChatsController from '../../controllers/ChatsController'
import UsersController from '../../controllers/UsersController'
import template from './template.hbs'
import './styles.sass'

export class BaseBodyModalAddUserChat extends Block<BaseBodyModalAddUserChatProps> {
  constructor(props: BaseBodyModalAddUserChatProps) {
    super(props)

    this.props.events = {
      submit: (e) => {
        e.preventDefault()
        e.stopPropagation()

        this.handleCreateChat()
      }
    }
  }

  private handleCreateChat = () => {
    const Input = this.children.Input
    const messenger = this.getProps().messenger!
    const { selectIdChat } = messenger

    if (!Array.isArray(Input)) {
      const value = (Input as Input).getValue()

      UsersController.searchUsers({ login: value }).then((res) => {
        if (res) {
          this.children.ItemSearchList = res.map(item => {
            return new ItemSearchList({
              ...item,
              events: {
                click: (e) => {
                  e.preventDefault()
                  e.stopPropagation()

                  const selectIdUser = +(e.currentTarget as HTMLButtonElement).id

                  if (selectIdChat) {
                    ChatsController.addUserToChat({ chatId: selectIdChat, users: [selectIdUser] })
                  }
                }
              }
            })
          })

          this.setProps({ isEmptyListUsers: res.length === 0 })
        }
      })
    }
  }

  protected init(): void {
    const formName = 'formNameAddUser'

    this.setProps({ formName })

    this.children.Input = new Input({
      id: 'login',
      placeholder: 'Введите логин пользователя',
      fieldName: 'login',
      required: true,
      typeField: 'text',
    })
    
    this.children.Button = new Button({
      label: 'Найти пользователя',
      buttonName: 'buttonModal',
      formName,
      typeButton: 'submit'
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      title: 'Добавить пользователя',
      isEmptyListUsers: false,
      ...props,
    })
  }
}

export const BodyModalAddUserChat = withStore<BaseBodyModalAddUserChatProps>((state) => ({
  messenger: state.messenger,
}))(BaseBodyModalAddUserChat)


export type BaseBodyModalAddUserChatProps = DefaultProps & Partial<State> & {
  title?: string
  error?: string | null
  formName?: string
  isEmptyListUsers?: boolean
}
