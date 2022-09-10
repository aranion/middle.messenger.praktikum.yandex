import "./assets/normalize.sass"
import "./index.sass"
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

// window.addEventListener('DOMContentLoaded', () => {
//   const root: HTMLDivElement | null = document.querySelector('#root')

  // const propsMyButton = {
  //   label: 'Жмякни',
  //   events: {
  //     click: () => {
  //       console.log('ЖМЯКНУЛИ')
  //     }
  //   }
  // }
  // const propsMyButton2 = {
  //   label: 'Жмякни2',
  //   events: {
  //     click: () => {
  //       console.log('ЖМЯКНУЛИ2')
  //     }
  //   }
  // }

  // const myButton = new MyButton(propsMyButton)
  // const myButton2 = new MyButton(propsMyButton2)
  // const home = new Home({ myButton, myButton2, title: 'Home' })


    // if (root) {
    // const homePage = home.getContent()
    // if (homePage) {
    //   root.append(homePage)
    //   setTimeout(() => {
    //     home.setProps({ title: 'new tittle' })
    //   }, 1000)
    // }
//   } else {
//     throw Error('Элемент с id = "root" не найден')
//   }
// })