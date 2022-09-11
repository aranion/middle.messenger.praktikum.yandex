import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfileProps } from '../FieldProfile'
import { FieldForm } from '../FieldForm'
import template from './template.hbs'
import './styles.sass'


export class EditProfileField extends Block<EditProfileFieldProps> {
  constructor(props: EditProfileFieldProps) {
    super(props)
  }

  protected init(): void {
    const { inputProps } = this.getProps()

    this.children.FieldForm = new FieldForm({
      inputProps: {
        typeField: 'text',
        classesList: ['editProfileField__value'],
        ...inputProps
      },
      classesList: ['editProfileField__value'],
    })
  }

  render() {
    return this.compile(template, {
      ...this.props,
    })
  }
}

export type EditProfileFieldProps = DefaultProps
  & FieldProfileProps
