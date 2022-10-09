import { DefaultProps, Block } from '../../utils/Block'
import { Button, ItemSearchList } from '../'
import { State } from '../../store'
import { withStore } from '../../hock/withStore'
import ChatsController from '../../controllers/ChatsController'
import template from './template.hbs'
import './styles.sass'

export class BaseBodyModalDeleteUserChat extends Block<BaseBodyModalDeleteUserChatProps> {
  constructor(props: BaseBodyModalDeleteUserChatProps) {
    super(props)
  }

  private handleCreateChat = () => {
    const Input = this.children.Input
    const messenger = this.getProps().messenger!
    const settings = this.getProps().settings!
    const { selectIdChat } = messenger
    const { user } = settings

    if (!selectIdChat || !user) {
      return
    }

    if (!Array.isArray(Input)) {
      const handleGetListUsers = () => {
        ChatsController.getChatUsers({ chatId: selectIdChat }).then((res) => {
          if (res) {
            const notMyId = res.filter(item => item.id !== user.id)

            this.children.ItemSearchList = notMyId.map(item => {
              return new ItemSearchList({
                ...item,
                events: {
                  click: (e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    const selectIdUser = +(e.currentTarget as HTMLButtonElement).id

                    if (selectIdChat) {
                      ChatsController.deleteUserToChat({ chatId: selectIdChat, users: [selectIdUser] })
                        .then(() => {
                          handleGetListUsers()
                        })
                    }
                  }
                }
              })
            })

            this.setProps({ isEmptyListUsers: notMyId.length === 0 })
          }
        })
      }

      handleGetListUsers()
    }
  }

  protected init(): void {
    this.children.Button = new Button({
      label: 'Получить список',
      buttonName: 'buttonDelete',
      events: {
        click: (e) => {
          e.preventDefault()
          e.stopPropagation()

          this.handleCreateChat()
        }
      }
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      title: 'Пользователи в чате',
      isEmptyListUsers: false,
      ...props,
    })
  }
}

export const BodyModalDeleteUserChat = withStore<BaseBodyModalDeleteUserChatProps>((state) => ({
  messenger: state.messenger,
  settings: state.settings
}))(BaseBodyModalDeleteUserChat)

export type BaseBodyModalDeleteUserChatProps = DefaultProps & Partial<State> & {
  title?: string
  error?: string | null
  formName?: string
  isEmptyListUsers?: boolean
}
