import { DefaultProps, Block } from '../../utils/Block'
import template from './template.hbs'
import './styles.sass'

export class ItemSearchList extends Block<ItemSearchListProps> {
  constructor(props: ItemSearchListProps) {
    super(props)
  }

  render() {
    const props = this.getProps()

    return this.compile(template, {
      title: 'Добавить пользователя',
      listUsers: [],
      isEmptyListUsers: false,
      ...props,
    })
  }
}

export type ItemSearchListProps = DefaultProps & {
  id: number
  login: string
  first_name: string
}
