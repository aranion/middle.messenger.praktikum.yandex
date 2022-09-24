import { Block, DefaultProps } from '../../utils/Block'
import { validateValue as defaultValidateValue, ValidateValue } from '../../utils/validateValue'
import { ErrorValidateInput } from '../ErrorValidateInput'
import { Input, InputProps } from '../Input'
import template from './template.hbs'
import './styles.sass'

export class FieldForm extends Block<FieldFormProps> {
  constructor(props: FieldFormProps) {
    super(props)

    const FieldFormElement = this.getContent()

    if (FieldFormElement) {
      const ErrorValidateInput = this.children.ErrorValidateInput
      const InputElement = FieldFormElement.querySelector('input')
      const LabelElement = FieldFormElement.querySelector('label')
      const isNotArrayElement = !Array.isArray(ErrorValidateInput)
      const { events = {} } = this.getProps()
      const { blur, focus } = events

      const handleFocus = (e: FocusEvent) => {
        if (isNotArrayElement) {
          ErrorValidateInput.setProps({ isInvisible: true })
        }

        if (focus) { focus(e) }
      }

      const handleBlur = (e: FocusEvent) => {
        if (e.target) {
          if (isNotArrayElement) {
            const isValidateValue = this.validate()

            ErrorValidateInput.setProps({ isInvisible: isValidateValue })
          }

          if (blur) { blur(e) }
        }
      }

      const handleChangeInput = (e: KeyboardEvent) => {
        const TargetInput = e.target as HTMLInputElement
        const isHiddenLabel = TargetInput && TargetInput.value === ''

        if (isHiddenLabel) {
          LabelElement?.classList.add('hidden')
        } else {
          LabelElement?.classList.remove('hidden')
        }
      }

      if (InputElement) {
        InputElement.addEventListener('blur', handleBlur)
        InputElement.addEventListener('focus', handleFocus)
        InputElement.addEventListener('keyup', handleChangeInput)
      }
    }
  }

  public validate(): boolean {
    const { validateValue = defaultValidateValue, inputProps } = this.getProps()
    const { fieldName } = inputProps
    const InputElement = this.children.Input
    const isNotArrayInputElement = !Array.isArray(InputElement)

    if (fieldName && isNotArrayInputElement) {
      const TargetInput = InputElement.getContent() as HTMLInputElement
      const inputValue = TargetInput.value

      return validateValue(inputValue, fieldName)
    } else {
      return true
    }
  }

  protected init(): void {
    const { errorMessage = 'Ошибка', inputProps, label } = this.getProps()

    this.children.ErrorValidateInput = new ErrorValidateInput({ errorMessage })

    this.children.Input = new Input({
      placeholder: label,
      ...inputProps
    })
  }

  render() {
    const { classesList = [], ...props } = this.getProps()

    return this.compile(template, {
      classes: classesList.join(' '),
      ...props,
    })
  }
}

export type FieldFormProps = DefaultProps & {
  label?: string
  inputProps: InputProps
  errorMessage?: string
  validateValue?: ValidateValue
  classesList?: string[]
  events?: {
    focus?: (e: FocusEvent) => any
    blur?: (e: FocusEvent) => any
  }
}

