import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';


const defaultState = {
  currencies: { byCode: {}, allCodes: [] },
  convert: { 
    from: { code: 'USD', rate: '', amount: '' },
    to: { code: 'RUB', rate: '', amount: '' },
  },
};

const fetchCurrenciesState = handleActions({
  [actions.fetchCurrenciesRequest]: () => 'requested',
  [actions.fetchCurrenciesFailure]: () => 'failed',
  [actions.fetchCurrenciesSuccess]: () => 'finished',
}, 'none');

const fetchFirstRateState = handleActions({
  [actions.fetchFirstRateRequest]: () => 'requested',
  [actions.fetchFirstRateFailure]: () => 'failed',
  [actions.fetchFirstRateSuccess]: () => 'finished',
}, 'none');

const fetchSecondRateState = handleActions({
  [actions.fetchSecondRateRequest]: () => 'requested',
  [actions.fetchSecondRateFailure]: () => 'failed',
  [actions.fetchSecondRateSuccess]: () => 'finished',
}, 'none');

const currencies = handleActions({
  [actions.fetchCurrenciesSuccess]: (state, { payload }) => ({
    ...state,
    byCode: _.keyBy(payload.currencies, 'code'),
    allCodes: payload.currencies.map((currensy) => currensy.code),
  }),
}, defaultState.currencies);

const convert = handleActions({
  [actions.fetchFirstRateSuccess]: (state, { payload }) => {
    const { amount: rate, time } = payload;

    return { ...state, from: { ...state.from, rate, time }};
  },

  [actions.fetchSecondRateSuccess]: (state, { payload }) => {
    const { amount: rate, time } = payload;

    return { ...state, to: { ...state.to, rate, time }};
  },

  [actions.setFirstCurrency]: (state, { payload }) => ({
    ...state,
    from: { ...state.from, code: payload.value },
  }),

  [actions.setSecondCurrency]: (state, { payload }) => ({
    ...state,
    to: { ...state.to, code: payload.value },
  }),

  [actions.setFirstAmount]: (state, { payload }) => ({
    ...state,
    from: { ...state.from, amount: payload.value },
  }),

  [actions.setSecondAmount]: (state, { payload }) => ({
    ...state,
    to: { ...state.to, amount: payload.value },
  }),

  [actions.calculateFirst]: (state, { payload }) => {
    const { value: amount } = payload;
    const { from: { rate } } = state;
    const calculateAmount = amount * rate;

    return {
      from: { ...state.from, amount: calculateAmount },
      to: { ...state.to, amount },
    };
  },
  
  [actions.calculateSecond]: (state, { payload }) => {
    const { value: amount } = payload;
    const { to: { rate } } = state;
    const calculateAmount = amount * rate;

    return {
      from: { ...state.from, amount },
      to: { ...state.to, amount: calculateAmount },
    };
  },
}, defaultState.convert);

export default combineReducers({
  fetchCurrenciesState,
  fetchFirstRateState,
  fetchSecondRateState,
  currencies,
  convert,
});