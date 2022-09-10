import { Block, DefaultProps } from '../../utils/Block';
import template from './template.hbs';
import './styles.sass';

export class EditProfileField extends Block<EditProfileFieldProps> {
  constructor(props: EditProfileFieldProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      typeField: 'text',
      ...this.props,
    });
  }
}

export type EditProfileFieldProps = DefaultProps & {
  label: string
  value: string
  typeField?: 'text' | 'password' | 'email' | 'tel'
};
