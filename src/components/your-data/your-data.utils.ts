import { validationBuilder } from '../../utils/validationBuilder';
import { string, required, postalCode, nip, bankNumber } from '../../utils/validation';
import YourData from '../../types/yourData';

export const validationSchema = validationBuilder({
  company_name: [string, required],
  locality: [string, required],
  house_number: [string, required],
  postal_code: [string, postalCode, required],
  city: [string, required],
  nip: [string, nip, required],
  bank_number: [string, bankNumber, required],
});

export const initialValues: YourData = {
  company_name: '',
  locality: '',
  house_number: '',
  postal_code: '',
  city: '',
  nip: '',
  bank_number: '',
};
