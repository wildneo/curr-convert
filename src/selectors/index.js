import { createSelector } from 'reselect';
import { searchFilter } from '../utils';

export const getCurrencyByCode = (state) => state.currencies.byCode;
export const getCurrencyCodes = (state) => state.currencies.allCodes;
export const getSearchQuery = (state) => state.search.searchQuery;

export const currencySelector = createSelector(
  [getCurrencyByCode, getCurrencyCodes],
  (byCode, allCodes) => allCodes.map((code) => byCode[code]),
);

export const filteredCurrencySelector = createSelector(
  [currencySelector, getSearchQuery],
  (currencies, searchQuery) => (
    searchQuery
      ? searchFilter(currencies, searchQuery)
      : currencies
  ),
);
