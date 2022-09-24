import { DefaultProps } from './../../utils/Block'
import { Block } from '../../utils/Block'
import template from './template.hbs'
import DefaultAvatar from '../../assets/imgs/AvatarNoneIcon.svg'
import './styles.sass'

export class EditAvatar extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }
  protected init(): void {

  }

  protected render() {
    const props = this.getProps()

    return this.compile(template, {
      srcAvatar: DefaultAvatar,
      ...props
    })
  }
}

type Props = DefaultProps & {
  srcAvatar?: string
}