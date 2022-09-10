import { Block, DefaultProps } from '../../utils/Block';
import { validateValue as defaultValidateValue, TYPE_VALIDATE } from '../../utils/validateValue';
import template from './template.hbs';
import './styles.sass';

export class FieldForm extends Block<FieldFormProps> {
  constructor(props: FieldFormProps) {
    super(props);

    const FieldFormElement = this.getContent();
    const { events = {}, validateValue = defaultValidateValue, fieldName } = this.getProps();

    if (FieldFormElement) {
      const InputElement = FieldFormElement.querySelector('input');
      const LabelElement = FieldFormElement.querySelector('label');
      const SpanErrorElement = FieldFormElement.querySelector('span');

      if (LabelElement && InputElement) {
        InputElement.addEventListener('keyup', (e) => {
          const targetInput = e.target as HTMLInputElement;
          const isHiddenLabel = targetInput && targetInput.value === '';

          if (isHiddenLabel) {
            LabelElement.classList.add('hidden');
          } else {
            LabelElement.classList.remove('hidden');
          }
        });
      }

      if (InputElement && SpanErrorElement) {
        const { blur, focus } = events;

        const defaultFocus = (e: FocusEvent) => {
          debugger;
          SpanErrorElement.classList.add('destroy');
          InputElement.classList.remove('fieldForm__error');

          if (focus) {
            focus(e);
          }
        };

        const defaultBlur = (e: FocusEvent) => {
          debugger;
          if (e.target) {
            const targetInput = e.target as HTMLInputElement;
            const inputValue = targetInput.value;

            if (validateValue && fieldName) {
              const isValidateValue = validateValue(inputValue, fieldName);

              if (!isValidateValue) {
                SpanErrorElement.classList.remove('destroy');
                InputElement.classList.add('fieldForm__error');
              }
            }

            if (blur) {
              blur(e);
            }
          }
        };

        InputElement.addEventListener('blur', defaultBlur);
        InputElement.addEventListener('focus', defaultFocus);
      }
    }
  }

  render() {
    return this.compile(template, {
      ...this.props,
      id: this.props.id || '',
      typeField: this.props.typeField || 'text',
      placeholder: this.props.placeholder || this.props.label,
      errorMessage: this.props.errorMessage || 'Ошибка',
    });
  }
}

export type FieldFormProps = DefaultProps & {
  label: string
  fieldName?: keyof typeof TYPE_VALIDATE
  id?: string
  typeField?: keyof typeof TYPE_FIELD
  placeholder?: string
  errorMessage?: string
  required?: boolean
  validateValue?: (value: string, type: keyof typeof TYPE_VALIDATE) => boolean
  events?: {
    focus?: (e: FocusEvent) => any
    blur?: (e: FocusEvent) => any
  }
};

enum TYPE_FIELD {
  password = 'password',
  text = 'text',
  email = 'email',
  tel = 'tel',
}
