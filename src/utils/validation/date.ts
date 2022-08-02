import { addMethod, string } from 'yup';

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

addMethod(string, 'date', function dateValidator() {
  return this.test('date', 'Niepoprawna data', (value) => !value || DATE_FORMAT.test(value));
});

export const date = (context) => context.date();
