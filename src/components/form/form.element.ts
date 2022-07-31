import { Component, Ref } from 'component-decorators';
import { ObjectSchema, BaseSchema } from 'yup';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _mapValues from 'lodash/mapValues';

type ValidationSchema = ObjectSchema<Record<string, any>> | undefined;

type FormElementInitProps = {
  initialValues: { [key: string]: any };
  onSubmit: (values: Object) => void;
  validationSchema?: ValidationSchema;
};

interface InputElement extends HTMLElement {
  value: any;
  validate: (value: any) => void;
}

@Component({ selector: 'app-form', template: '<form>{{innerHTML}}</form>' })
export default class FormElement extends HTMLElement {
  @Ref('form') $form: HTMLFormElement;

  public init({ validationSchema, initialValues, onSubmit }: FormElementInitProps) {
    _forEach(initialValues, (value, name) => {
      const $input: InputElement = this.querySelector(`[name="${name}"]`);
      const schema: BaseSchema = _get(validationSchema, ['fields', name]);

      $input.value = value;
      if (schema) {
        // eslint-disable-next-line func-names
        $input.validate = (currentValue) => {
          schema
            .validate(currentValue)
            .then(() => {
              $input.removeAttribute('error');
            })
            .catch(({ errors }) => {
              $input.setAttribute('error', errors[0]);
            });
        };
      }
    });

    this.$form.onsubmit = (e) => {
      e.preventDefault();
      const result = _mapValues(initialValues, (_, name: string) => {
        const $webInput: HTMLInputElement = this.querySelector(`[name="${name}"]`);
        return $webInput.value;
      });
      if (validationSchema) {
        validationSchema
          .validate(result, { abortEarly: false })
          .then(() => {
            onSubmit(result);
          })
          .catch(({ inner: errors }) => {
            _forEach(errors, (error) => {
              const $webInput = this.querySelector(`[name="${error.path}"]`);
              $webInput.setAttribute('error', error.message);
            });
          });
      } else {
        onSubmit(result);
      }
    };
  }
}
