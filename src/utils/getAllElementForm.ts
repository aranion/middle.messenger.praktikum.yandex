export const getAllValuesForm = (e: SubmitEvent) => {
  e.preventDefault()
  e.stopPropagation()

  const FormElement = e.target as HTMLFormElement
  const inputsList = FormElement.querySelectorAll('input')
  const dataForm = Object.values(inputsList).reduce((res, input) => {
    res.push([input.id, input.value])

    return res
  }, [] as [string, string][])
  const dataFormObj = Object.fromEntries(dataForm)

  console.log('FORM NAME: ', FormElement.id, ' DATA: ', dataForm, dataFormObj)

  return dataFormObj
}