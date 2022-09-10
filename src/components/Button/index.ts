import { Block, DefaultProps } from '../../utils/Block';
import template from './template.hbs';
import './styles.sass';

export class Button extends Block<PropsButton> {
  constructor(props: PropsButton) {
    super(props);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      formName: this.props.formName || '',
      type: this.props.type || 'button',
    });
  }
}

export type PropsButton = DefaultProps & {
  label: string
  buttonName: string
  type?: 'submit' | 'reset' | 'button' | 'menu'
  formName?: string
};