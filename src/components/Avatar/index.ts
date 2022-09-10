import { Block, DefaultProps } from '../../utils/Block';
import template from './template.hbs';
import defaultAvatarImg from '../../assets/imgs/AvatarDefault.svg';
import './styles.sass';

export class Avatar extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, { srcAvatar: defaultAvatarImg, ...this.props });
  }
}

type Props = DefaultProps & {
  srcAvatar?: string
};