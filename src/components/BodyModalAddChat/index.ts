import { DefaultProps, Block } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'
import { Button, Input } from '..'
import ChatsController from '../../controllers/ChatsController'

export class BodyModalAddChat extends Block<BodyModalAddChatProps> {
  constructor(props: BodyModalAddChatProps) {
    super(props)

    this.props.events = {
      submit: (e) => {
        e.preventDefault()
        this.handleCreateChat()
      }
    }
  }

  private handleCreateChat = () => {
    const Input = this.children.Input

    if (!Array.isArray(Input)) {
      const value = (Input as Input).getValue()
      const name = (Input as Input).getName()

      if (value && name === 'title') {
        ChatsController.createChat({ [name]: value })
        this.setProps({ error: "" })
        Input.setProps({ value: '' })
      } else {
        this.setProps({ error: "Необходимо ввести название чата" })
      }
    }
  }

  protected init(): void {
    const formName = 'formName'

    this.setProps({ formName })

    this.children.Input = new Input({
      id: 'title',
      placeholder: 'Введите название чата',
      fieldName: 'title',
      required: true,
      typeField: 'text',
    })
    this.children.Button = new Button({
      label: 'Создать',
      buttonName: 'buttonModal',
      formName,
      typeButton: 'submit'
    })
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      title: 'Создать чат',
      ...props,
    })
  }
}

export type BodyModalAddChatProps = DefaultProps & {
  title?: string
  error?: string | null
  formName?: string
}
