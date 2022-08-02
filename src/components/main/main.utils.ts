import { validationBuilder } from '../../utils/validationBuilder';
import { string, required, date, amount } from '../../utils/validation';

export const validationSchema = validationBuilder({
  date: [string, date, required],
  issuer: [string, required],
  amount: [string, amount, required],
});
