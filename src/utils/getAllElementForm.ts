import { ROUTE_LINK } from '../router/routeLink'

export const getAllElementForm = (e: SubmitEvent) => {
  e.preventDefault()
  e.stopPropagation()

  const FormElement = e.target as HTMLFormElement
  const inputsList = FormElement.querySelectorAll('input')
  FormElement.querySelectorAll('label').forEach(item => console.log(item.blur()))

  console.log('FORM NAME: ', FormElement.id)

  Object.values(inputsList).forEach((input) => {
    console.log(input.id, ':', input.value)
  })

  if (true) {
    window.location.pathname = ROUTE_LINK.CHATS
  }
}