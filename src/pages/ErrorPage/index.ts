import { Block, DefaultProps } from '../../utils/Block';
import template from './template.hbs';
import './styles.sass';


export class ErrorPage extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export type ErrorProps = DefaultProps & {
  title: string
  href: string
  text: string
  labelLink: string
};