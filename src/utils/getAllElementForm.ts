export const getAllValuesForm = (form: HTMLFormElement): unknown => {
  const FormElement = form
  const inputsList = FormElement.querySelectorAll('input')
  const dataForm = Object.values(inputsList).reduce((res, input) => {
    res.push([input.id, input.value])

    return res
  }, [] as [string, string][])

  const dataFormObj = Object.fromEntries(dataForm) 

  return dataFormObj
}