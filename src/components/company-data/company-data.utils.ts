import { validationBuilder } from '../../utils/validationBuilder';
import { string, required, postalCode, nip } from '../../utils/validation';
import CompanyData from '../../types/companyData';

export const validationSchema = validationBuilder({
  company_name: [string, required],
  locality: [string, required],
  house_number: [string, required],
  postal_code: [string, postalCode, required],
  city: [string, required],
  nip: [string, nip, required],
});

export const initialValues: CompanyData = {
  company_name: '',
  locality: '',
  house_number: '',
  postal_code: '',
  city: '',
  nip: '',
};
