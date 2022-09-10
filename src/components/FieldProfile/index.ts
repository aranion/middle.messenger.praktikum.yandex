import { Block, DefaultProps } from '../../utils/Block';
import template from './template.hbs';
import './styles.sass';

export class FieldProfile extends Block<FieldProfileProps> {
  constructor(props: FieldProfileProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      ...this.props,
    });
  }
}

export type FieldProfileProps = DefaultProps & {
  label: string
  value: string
};
