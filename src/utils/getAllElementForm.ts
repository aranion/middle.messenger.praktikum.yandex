export const getAllValuesForm = (e: SubmitEvent) => {
  e.preventDefault()
  e.stopPropagation()

  const FormElement = e.target as HTMLFormElement
  const inputsList = FormElement.querySelectorAll('input')
  const dataForm = Object.values(inputsList).reduce((res, input) => {
    res[input.id] = input.value

    return res
  }, {} as Record<string, string>)

  console.log('FORM NAME: ', FormElement.id)
  console.log(dataForm)
}