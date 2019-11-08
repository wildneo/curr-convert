import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchCurrenciesRequest = createAction('FETCH_CURRENCIES_REQUEST');
export const fetchCurrenciesSuccess = createAction('FETCH_CURRENCIES_SUCCESS');
export const fetchCurrenciesFailure = createAction('FETCH_CURRENCIES_FAILURE');

export const fetchFirstRateRequest = createAction('FETCH_FIRST_RATE_REQUEST');
export const fetchFirstRateSuccess = createAction('FETCH_FIRST_RATE_SUCCESS');
export const fetchFirstRateFailure = createAction('FETCH_FIRST_RATE_FAILURE');

export const fetchSecondRateRequest = createAction('FETCH_SECOND_RATE_REQUEST');
export const fetchSecondRateSuccess = createAction('FETCH_SECOND_RATE_SUCCESS');
export const fetchSecondRateFailure = createAction('FETCH_SECOND_RATE_FAILURE');

export const setFirstCurrency = createAction('SET_FIRST_CURRENCY');
export const setSecondCurrency = createAction('SET_SECOND_CURRENCY');
export const calculateFirst = createAction('CALCULATE_FIRST');
export const calculateSecond = createAction('CALCULATE_SECOND');

export const setFirstAmount = createAction('SET_FIRST_AMOUNT');
export const setSecondAmount = createAction('SET_SECOND_AMOUNT');

export const fetchCurrencies = (currencies) => async (dispach) => {
  dispach(fetchCurrenciesRequest());
  try {
    const url = routes.listUrl({ currencies });
    const response = await axios.request(url);
    console.log(response);
    dispach(fetchCurrenciesSuccess({ ...response.data }));
  } catch (err) {
    dispach(fetchCurrenciesFailure());
    throw err;
  }
};

export const fetchFirstRate = (from, to) => async (dispach) => {
  dispach(fetchFirstRateRequest());
  try {
    const url = routes.convertUrl(from, to);
    const response = await axios.request(url);
    console.log(response);
    dispach(fetchFirstRateSuccess({ ...response.data }));
  } catch (err) {
    dispach(fetchFirstRateFailure());
    throw err;
  }
};

export const fetchSecondRate = (from, to) => async (dispach) => {
  dispach(fetchSecondRateRequest());
  try {
    const url = routes.convertUrl(from, to);
    const response = await axios.request(url);
    console.log(response);
    dispach(fetchSecondRateSuccess({ ...response.data }));
  } catch (err) {
    dispach(fetchSecondRateFailure());
    throw err;
  }
};

// export const fetchRates = (base) => async (dispach) => {
//   dispach(fetchRatesRequest());
//   try {
//     const url = routes.ratesUrl({ base });
//     const response = await axios.request(url);
//     console.log(response);
//     dispach(fetchRatesSuccess({ ...response.data }));
//   } catch (err) {
//     dispach(fetchRatesFailure());
//     throw err;
//   }
// };