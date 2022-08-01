import { addMethod, string } from 'yup';

const NIP_FORMAT = /^\d{10}$/;

const multipliers = [6, 5, 7, 2, 3, 4, 5, 6, 7, 0];

const checkSum = (digits: number[]) => digits.reduce((sum, value, i) => sum + value * multipliers[i], 0) % 11;

export const validateNip = (value: string): boolean => {
  const digits = value.split('').map((c: string) => parseInt(c, 10));

  return NIP_FORMAT.test(value) && digits[digits.length - 1] === checkSum(digits);
};

addMethod(string, 'nip', function nipValidator() {
  return this.test('nip', 'Niepoprawny NIP', (value) => !value || validateNip(value));
});

export const nip = (context) => context.nip();
