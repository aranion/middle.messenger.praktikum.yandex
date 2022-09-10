import { DefaultProps } from './../../utils/Block'
import { Button } from '../../components/Button'
import { FieldForm } from '../../components/FieldForm'
import { MyButton } from '../../components/__MyButton/index'
import { Block } from '../../utils/Block'
import template from './template.hbs'

export class Home extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected init(): void {
    this.children.myButton3 = new MyButton({
      label: 'Жмякни3',
      events: {
        click: () => {
          console.log('ЖМЯКНУЛИ3')
        }
      }
    })

    setTimeout(() => {
      this.setProps({ title: 'Update tittle' })
    }, 2000)
    setTimeout(() => {
      if (!Array.isArray(this.children.myButton3)) {
        this.children.myButton3.setProps({ label: '.....' })
      }
    }, 3000)

    this.children.Button = new Button({
      label: 'Авторизоваться',
      buttonName: 'authorization',
      type: 'submit',
    })
    this.children.FieldForm = new FieldForm({
      fieldName: 'login',
      label: 'Логин',
      id: 'login',
      typeField: 'text',
      placeholder: 'Логин',
      errorMessage: 'Неверный логин',
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

type Props = DefaultProps & Partial<{
  myButton: MyButton
  myButton2: MyButton
  title: string
}>