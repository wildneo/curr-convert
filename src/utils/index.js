import { escapeRegExp } from 'lodash';

export const mask = (value) => {
  return value
    .replace(/,/g, '.')
    .replace(/^\./g, '0.')
    .replace(/[^0-9.]|(?<=\.\d{2})\d*|\.(?=.*\.)/g, '')
};

export const searchFilter = (currencies, query) => {
  const exp = new RegExp(escapeRegExp(query), 'i');
  const predicate = currency => (
    exp.test(currency.code) || exp.test(currency.name)
  );

  return currencies.filter(predicate);
};
