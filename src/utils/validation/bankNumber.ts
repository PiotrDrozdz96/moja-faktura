import { addMethod, string } from 'yup';

const BANK_NUMBER_FORMAT = /^\d{2}(\s\d{4}){6}$/;

addMethod(string, 'bankNumber', function bankNumberValidator() {
  return this.test('bankNumber', 'Niepoprawny numer konta', (value) => !value || BANK_NUMBER_FORMAT.test(value));
});

export const bankNumber = (context) => context.bankNumber();
