import './assets/normalize.sass'
import './index.sass'
import { routePage } from './router/routePage'

window.addEventListener('DOMContentLoaded', () => {
  const root: HTMLDivElement | null = document.querySelector('#root')

  if (root) {

    const Page = routePage().getContent()

    if (Page) {
      root.append(Page)
    }

  } else {
    throw new Error('Элемент с id = "root" не найден')
  }
})