import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfileProps, Button, EditProfileField } from '../'
import template from './template.hbs'
import './styles.sass'

export class EditProfile extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  protected init(): void {
    const { fields } = this.getProps()

    this.children.Fields = fields.map(field => {
      return new EditProfileField({ ...field })
    })

    this.children.ButtonSave = new Button({ buttonName: 'saveProfile', label: 'Сохранить', type: 'submit' })
  }

  render() {
    const { fields } = this.getProps()
    const nameUser = fields[2].value

    return this.compile(template, {
      ...this.props,
      nameUser
    })
  }
}

type Props = DefaultProps & {
  fields: FieldProfileProps[]
}
