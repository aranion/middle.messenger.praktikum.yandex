export const validateValue: ValidateValue = (value, typeInput, regExp) => {
  const listValidateFn: ListValidateFn = {
    password: (value) => (regExp || /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).test(value),
    first_name: (value) => (regExp || /^[A-ZА-Я]{1}[-A-zА-яЁё]{1,}$/).test(value),
    second_name: (value) => (regExp || /^[A-ZА-Я]{1}[-A-zА-яЁё]{1,}$/).test(value),
    display_name: (value) => (regExp || /^[A-ZА-Я]{1}[-A-zА-яЁё]{1,}$/).test(value),
    login: (value) => (regExp || /^[-0-9A-z]{2,18}([A-z]{1}[-0-9A-z]?)$/).test(value),
    email: (value) => (regExp || /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/).test(value),
    phone: (value) => (regExp || /^[0-9+][0-9]{9,14}$/i).test(value),
    message: (value) => (regExp || /^./).test(value),
    notEmpty: (value) => (regExp || /^./).test(value),
  }

  return listValidateFn[typeInput](value)
}

export enum TYPE_VALIDATE {
  password = 'password',
  first_name = 'first_name',
  second_name = 'second_name',
  display_name = 'display_name',
  login = 'login',
  email = 'email',
  phone = 'phone',
  message = 'message',
  notEmpty = 'notEmpty',
}
export type ValidateValue = (value: string, typeInput: keyof typeof TYPE_VALIDATE, regExp?: RegExp) => boolean
type ListValidateFn = Record<keyof typeof TYPE_VALIDATE, (v: string) => boolean>