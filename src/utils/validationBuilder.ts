import { object } from 'yup';
import _mapValues from 'lodash/mapValues';
import _reduce from 'lodash/reduce';
import _isFunction from 'lodash/isFunction';

export const reduceValidators = (context, validators) =>
  _reduce(validators, (chain, validator) => validator(chain), context);

export const validationBuilder = (validationMap) => {
  const validationSchema = object();

  const validationShape = _mapValues(validationMap, ([typeValdator, ...restValidators]) =>
    reduceValidators(_isFunction(typeValdator) ? typeValdator() : typeValdator, restValidators)
  );

  return validationSchema.shape(validationShape);
};
