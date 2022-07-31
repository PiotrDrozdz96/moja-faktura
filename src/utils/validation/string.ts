import { string as yupString } from 'yup';

export const string = () => yupString().typeError('Wartość musi być ciągiem znaków');
