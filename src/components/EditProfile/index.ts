import { FieldForm } from './../FieldForm/index'
import { Block, DefaultProps } from '../../utils/Block'
import { FieldProfileProps, Button, EditProfileField } from '../'
import template from './template.hbs'
import './styles.sass'
import { PropsWithRouter, withRouter } from '../../hock/withRouter'
import { IdInputFieldPassword } from '../../constants/metaData/profile'
import { getAllValuesForm } from '../../utils/getAllElementForm'

export class BaseEditProfile extends Block<Props> {
  constructor(props: Props) {
    super(props)
  }

  public getFieldsFormValue<T>(): T {
    const Form = this.element
    const fieldsFormValue = getAllValuesForm(Form as HTMLFormElement) as T

    return fieldsFormValue
  }

  private checkIdFields = (field: Block<any>) => {
    const { inputProps } = field.getProps()
    const id = inputProps.id as Exclude<keyof typeof IdInputFieldPassword, 'oldPassword'>

    return id === 'newPassword' || id === 'newTwoPassword'
  }

  private getIsPasswordEqual = (fields: Block<any>[]) => {
    const passwords = fields
      .reduce<string[]>((res, field) => {
        const isFieldPassword = this.checkIdFields(field)

        if (isFieldPassword) {
          const Element = field.getContent()
          const value = Element?.querySelector('input')?.value

          if (value !== undefined) {
            res.push(value)
          }
        }

        return res
      }, [])

    return passwords.every((password) => password === passwords[0])
  }

  public validateFields() {
    let isFieldPassword = false
    const { EditProfileField } = this.children
    const fields = Array.isArray(EditProfileField) ? EditProfileField : []
    const isPasswordEqual = this.getIsPasswordEqual(fields)
    const isValidate = fields.reduce((res, field) => {
      const children = field.getChildren()
      const FieldForm = children.FieldForm as FieldForm
      isFieldPassword = this.checkIdFields(field)

      if (!Array.isArray(FieldForm)) {
        const { ErrorValidateInput } = FieldForm.getChildren()
        const isValidateValue = FieldForm.validate()

        if (!Array.isArray(ErrorValidateInput)) {
          const propsErrorValidateInput = ErrorValidateInput.getProps()

          if (isFieldPassword) {
            ErrorValidateInput.setProps({
              ...propsErrorValidateInput,
              isInvisible: isValidateValue && isPasswordEqual,
              errorMessage: isPasswordEqual ? 'Ошибка' : 'Пароли не совпадают'
            })
          } else {
            ErrorValidateInput.setProps({ ...propsErrorValidateInput, isInvisible: isValidateValue })
          }
        }
        return res && isValidateValue
      }
    }, true)

    return isFieldPassword ? isValidate && isPasswordEqual : isValidate
  }

  protected init(): void {
    const { fields, formName } = this.getProps()

    this.children.EditProfileField = fields.map(field => new EditProfileField({ ...field }))

    this.children.ButtonSave = new Button({
      formName,
      buttonName: 'saveProfile',
      label: 'Сохранить',
      typeButton: 'submit',
    })
  }

  render() {
    const props = this.getProps()
    const nameUser = props.fields.find(({ inputProps }) => inputProps?.id === 'first_name')?.inputProps?.value

    return this.compile(template, {
      nameUser,
      ...props,
    })
  }
}

export const EditProfile = withRouter(BaseEditProfile)

type Props = DefaultProps & PropsWithRouter & {
  fields: FieldProfileProps[]
  formName: string
}
