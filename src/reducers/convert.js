import { handleActions } from 'redux-actions';
import { floor } from 'lodash';
import { INIT_BASE, INIT_QUOTE, INIT_AMOUNT } from '../consts';
import * as actions from '../actions';

export const defaultState = {
  mode: 'first',
  base: INIT_BASE,
  quote: INIT_QUOTE,
  firstAmount: INIT_AMOUNT,
  secondAmount: INIT_AMOUNT,
  rate: 1,
};

export default handleActions({
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
    const oppositeRate = 1 / rate;
  
    const mapping = {
      first: { secondAmount: floor(state.firstAmount * oppositeRate, 2) },
      second: { firstAmount: floor(state.secondAmount * rate, 2) },
    };

    return {
      ...state,
      ...mapping[mode],
      base: state.quote,
      quote: state.base,
      rate: oppositeRate,
    };
  },
}, defaultState);