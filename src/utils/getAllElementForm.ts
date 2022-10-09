export const getAllValuesForm = <T>(form: HTMLFormElement): T => {
  const FormElement = form
  const inputsList = FormElement.querySelectorAll('input')
  const dataForm = Object.values(inputsList).reduce((res, input) => {
    res.push([input.id, input.value])

    return res
  }, [] as [string, string][])

  const dataFormObj = Object.fromEntries(dataForm) as T

  return dataFormObj
}