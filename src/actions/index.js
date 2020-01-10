import axios from 'axios';
import { createAction } from 'redux-actions';
import { INIT_BASE, INIT_QUOTE } from '../consts';
import routes from '../routes';

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

export const fetchConverted = (from, to) => async (dispach) => {
  dispach(fetchConvertedRequest());
  try {
    const convertUrl = routes.convertUrl(from, to);
    const { data: { amount: rate } } = await axios.request(convertUrl);
    // TODO:
    // Как оказалось, сервер может ответить значением amount: 0.
    // Стоит добавить проверку на ноль и наверное, кидать исключение,
    // пока не придкмал как с этим быть.
    dispach(fetchConvertedSuccess({ rate }));
  } catch (err) {
    dispach(fetchConvertedFailure());
    throw err;
  }
};

export const fetchCurrencies = () => async (dispach) => {
  dispach(fetchCurrenciesRequest());
  try {
    const listUrl = routes.listUrl();
    const response = await axios.request(listUrl);
    await dispach(fetchConverted(INIT_BASE, INIT_QUOTE));
    dispach(fetchCurrenciesSuccess({ ...response.data }));
  } catch (err) {
    dispach(fetchCurrenciesFailure());
    throw err;
  }
};
