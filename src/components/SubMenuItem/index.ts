import { Block, DefaultProps } from '../../utils/Block';
import template from './template.hbs';
import './styles.sass';

export class SubMenuItem extends Block<SubMenuItemProps> {
  constructor(props: SubMenuItemProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      ...this.props,
    });
  }
}

export type SubMenuItemProps = DefaultProps & {
  rotateDeg?: number
  srcImg: string
  title: string
};
