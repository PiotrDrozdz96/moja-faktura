import { addMethod, string } from 'yup';

const AMOUNT_FORMAT = /^\d+(\.\d{2})?$/;

addMethod(string, 'amount', function amountValidator() {
  return this.test('amount', 'Niepoprawna kwota', (value) => {
    let formattedValue = value.replace(/\s/g, '');
    formattedValue = formattedValue.replace(/,/g, '.');

    return !value || !isNaN(Number(formattedValue)) || AMOUNT_FORMAT.test(formattedValue);
  });
});

export const amount = (context) => context.amount();
