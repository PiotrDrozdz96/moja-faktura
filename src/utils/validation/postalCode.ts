import { addMethod, string } from 'yup';

const POSTAL_CODE_FORMAT = /^\d{2}-\d{3}$/;

addMethod(string, 'postalCode', function postalCodeValidator() {
  return this.test('postalCode', 'Niepoprawny kod pocztowy', (value) => !value || POSTAL_CODE_FORMAT.test(value));
});

export const postalCode = (context) => context.postalCode();
