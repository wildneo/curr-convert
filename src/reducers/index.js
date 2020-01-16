import { combineReducers } from 'redux';
import { fetchCurrenciesState, fetchConvertState } from './feth';
import currencies from './currencies';
import convert from './convert';
import search from './search';

export default combineReducers({
  fetchCurrenciesState,
  fetchConvertState,
  currencies,
  convert,
  search,
});