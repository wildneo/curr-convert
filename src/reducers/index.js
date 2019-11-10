import { combineReducers } from 'redux';
import { fetchCurrenciesState, fetchConvertState } from './feth';
import currencies from './currencies';
import convert from './convert';

export default combineReducers({
  fetchCurrenciesState,
  fetchConvertState,
  currencies,
  convert,
});