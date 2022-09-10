import { Block, DefaultProps } from '../../utils/Block';
import template from './template.hbs';
import AarrowIcon from '../../assets/imgs/AarrowIcon.svg';
import './styles.sass';

export class ButtonCircle extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, {
      typeButton: 'button',
      direction: 'right',
      srcIcon: AarrowIcon,
      alt: 'button',
      ...this.props,
    });
  }
}

type Props = DefaultProps & {
  typeButton?: 'submit' | 'button'
  direction?: Direction
  alt?: string
};

type Direction = 'left' | 'right';