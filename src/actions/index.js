import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

const INIT_BASE = process.env.REACT_APP_INIT_BASE;
const INIT_QUOTE = process.env.REACT_APP_INIT_QUOTE;
const INIT_AMOUNT = process.env.REACT_APP_INIT_AMOUNT;

export const fetchCurrenciesRequest = createAction('FETCH_CURRENCIES_REQUEST');
export const fetchCurrenciesSuccess = createAction('FETCH_CURRENCIES_SUCCESS');
export const fetchCurrenciesFailure = createAction('FETCH_CURRENCIES_FAILURE');

export const fetchConvertedRequest = createAction('FETCH_CONVERTED_REQUEST');
export const fetchConvertedSuccess = createAction('FETCH_CONVERTED_SUCCESS');
export const fetchConvertedFailure = createAction('FETCH_CONVERTED_FAILURE');

export const setBaseCurrency = createAction('SET_BASE_CURRENCY');
export const setQuoteCurrency = createAction('SET_QUOTE_CURRENCY');

export const setFirstAmount = createAction('SET_FIRST_AMOUNT');
export const setSecondAmount = createAction('SET_SECOND_AMOUNT');

export const switchInputs = createAction('SWITCH_INPUTS');


export const fetchCurrencies = () => async (dispach) => {
  dispach(fetchCurrenciesRequest());
  try {
    const listUrl = routes.listUrl();
    const convertUrl = routes.convertUrl(INIT_BASE, INIT_QUOTE);
    const listResponse = await axios.request(listUrl);
    const { data: { amount: rate } } = await axios.request(convertUrl);
    dispach(fetchCurrenciesSuccess({
      ...listResponse.data,
      convert: {
        base: INIT_BASE,
        quote: INIT_QUOTE,
        startAmount: INIT_AMOUNT,
        rate,
      },
    }));
  } catch (err) {
    dispach(fetchCurrenciesFailure());
    throw err;
  }
};

export const fetchConverted = (from, to) => async (dispach) => {
  dispach(fetchConvertedRequest());
  try {
    const convertUrl = routes.convertUrl(from, to);
    const { data: { amount: rate, time } } = await axios.request(convertUrl);
    dispach(fetchConvertedSuccess({ rate, time }));
  } catch (err) {
    dispach(fetchConvertedFailure());
    throw err;
  }
};
