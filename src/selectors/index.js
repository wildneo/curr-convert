import { createSelector } from 'reselect';

export const getCurrencyByCode = (state) => state.currencies.byCode;
export const getCurrencyCodes = (state) => state.currencies.allCodes;

export const currencySelector = createSelector(
  [getCurrencyByCode, getCurrencyCodes],
  (byCode, allCodes) => allCodes.map((code) => byCode[code]),
);
