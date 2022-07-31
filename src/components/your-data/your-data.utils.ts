import { validationBuilder } from '../../utils/validationBuilder';
import { string, required } from '../../utils/validation';
import YourData from '../../types/yourData';

export const validationSchema = validationBuilder({
  company_name: [string, required],
  locality: [string, required],
  house_number: [string, required],
  postal_code: [string, required],
  city: [string, required],
  nip: [string, required],
});

export const initialValues: YourData = {
  company_name: '',
  locality: '',
  house_number: '',
  postal_code: '',
  city: '',
  nip: '',
};
