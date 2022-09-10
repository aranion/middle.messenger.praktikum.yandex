export const validateValue = (value: string, typeInput: keyof typeof TYPE_VALIDATE, regExp?: RegExp): boolean => {
  const listValidateFn: ValidateValue = {
    //от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра
    password: (value) => (regExp || /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).test(value),
    //латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)
    first_name: (value) => (regExp || /^[A-ZА-Я]{1}[-A-zА-яЁё]{1,}$/).test(value),
    //латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)
    second_name: (value) => (regExp || /^[A-ZА-Я]{1}[-A-zА-яЁё]{1,}$/).test(value),
    display_name: (value) => (regExp || /^[A-ZА-Я]{1}[-A-zА-яЁё]{1,}$/).test(value),
    //от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
    login: (value) => (regExp || /^[-0-9A-z]{2,18}([A-z]{1}[-0-9A-z]?)$/).test(value),
    // латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы
    email: (value) => (regExp || /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/).test(value),
    //от 10 до 15 символов, состоит из цифр, может начинается с плюса            
    phone: (value) => (regExp || /^([+]?[0-9]{10,15})*$/i).test(value),
    //Не пустой
    message: (value) => (regExp || /^./).test(value)
  }

  return listValidateFn[typeInput](value)
}

type ValidateValue = Record<keyof typeof TYPE_VALIDATE, (v: string) => boolean>
export enum TYPE_VALIDATE {
  password = 'password',
  first_name = 'first_name',
  second_name = 'second_name',
  display_name = 'display_name',
  login = 'login',
  email = 'email',
  phone = 'phone',
  message = 'message',
}