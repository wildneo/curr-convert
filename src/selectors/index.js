import { createSelector } from 'reselect';

export const getCurrencyByCode = (state) => state.currencies.byCode;
export const getCurrencyCodes = (state) => state.currencies.allCodes;

export const currencySelector = createSelector(
  [getCurrencyByCode, getCurrencyCodes],
  (byCode, allCodes) => allCodes.map((code) => byCode[code]),
);

// export const currencySelector = createSelector(
//   [getCurrencyByCode, getCurrencyCodes],
//   (byCode, allCodes) => allCodes.map((code) => ({
//     key: byCode[code].code,
//     value: byCode[code].code,
//     text: byCode[code].name,
//     description: byCode[code].code,
//     style: { whiteSpace: 'normal' },
//   })),
// );
