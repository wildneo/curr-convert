import { handleActions } from 'redux-actions';
import { floor } from 'lodash';
import * as actions from '../actions';

const defaultState = {
  mode: 'first',
  firstAmount: '100',
  secondAmount: '200',
  base: 'USD',
  quote: 'RUB',
  rate: 2,
};

export default handleActions({
  [actions.fetchCurrenciesSuccess]: (state, { payload }) => {
    const { base, quote, startAmount, rate } = payload.convert;
    const firstAmount = startAmount;
    const secondAmount = startAmount * rate;

    return {
      ...state,
      firstAmount,
      secondAmount,
      base,
      quote,
      rate,
    };
  },

  [actions.fetchConvertedSuccess]: (state, { payload }) => {
    const { rate } = payload;
    const { firstAmount, secondAmount, mode } = state;
    const oppositeRate = 1 / rate;

    const mapping = {
      first: { secondAmount: floor(firstAmount * rate, 2) },
      second: { firstAmount: floor(secondAmount * oppositeRate, 2) },
    };

    return {
      ...state,
      ...mapping[mode],
      rate,
    };
  },

  [actions.setBaseCurrency]: (state, { payload }) => {
    const { value: base } = payload;

    return { ...state, base };
  },

  [actions.setQuoteCurrency]: (state, { payload }) => {
    const { value: quote } = payload;

    return { ...state, quote };
  },

  [actions.setFirstAmount]: (state, { payload }) => {
    const { value: firstAmount } = payload;
    const { rate } = state;
    const secondAmount = floor(firstAmount * rate, 2);

    return {
      ...state,
      firstAmount,
      secondAmount,
      mode: 'first',
    };
  },

  [actions.setSecondAmount]: (state, { payload }) => {
    const { value: secondAmount } = payload;
    const { rate } = state;
    const firstAmount = floor(secondAmount * (1 / rate), 2);

    return {
      ...state,
      firstAmount,
      secondAmount,
      mode: 'second',
    };
  },

  [actions.switchInputs]: (state) => {
    const { mode, rate } = state;
    const newRate = 1 / rate;
  
    const mapping = {
      first: { secondAmount: state.firstAmount * newRate },
      second: { firstAmount: state.secondAmount * rate },
    };

    return {
      ...state,
      ...mapping[mode],
      base: state.quote,
      quote: state.base,
      rate: newRate,
    };
  },
}, defaultState);