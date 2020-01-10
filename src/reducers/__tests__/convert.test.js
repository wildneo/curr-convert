import reducer, { defaultState } from '../convert';
import * as actions from '../../actions';

describe('Convert', () => {
  test('fetchConvertedSuccess', () => {
    const action = actions.fetchConvertedSuccess;
    const rate = 2;
    const expectedState = {
      ...defaultState,
      secondAmount: 200,
      rate,
    };
    expect(reducer(defaultState, action({ rate }))).toEqual(expectedState);
  });

  test('setBaseCurrency', () => {
    const action = actions.setBaseCurrency;
    const value = 'ALL';
    const expectedState = {
      ...defaultState,
      base: value,
    };
    expect(reducer(defaultState, action({ value }))).toEqual(expectedState);
  });

  test('setQuoteCurrency', () => {
    const action = actions.setQuoteCurrency;
    const value = 'BRL';
    const expectedState = {
      ...defaultState,
      quote: value,
    };
    expect(reducer(defaultState, action({ value }))).toEqual(expectedState);
  });

  test('setFirstAmount', () => {
    const action = actions.setFirstAmount;
    const value = 1000;
    const rate = 2;
    const initState = {
      ...defaultState,
      rate,
    };
    const expectedState = {
      ...initState,
      firstAmount: value,
      secondAmount: value * rate,
    };
    expect(reducer(initState, action({ value }))).toEqual(expectedState);
  });

  test('setSecondAmount', () => {
    const action = actions.setSecondAmount;
    const value = 1000;
    const rate = 2;
    const initState = {
      ...defaultState,
      rate,
    };
    const expectedState = {
      ...initState,
      mode: 'second',
      firstAmount: value / rate,
      secondAmount: value,
    };
    expect(reducer(initState, action({ value }))).toEqual(expectedState);
  });

  test('switchInputs', () => {
    const action = actions.switchInputs;
    const initState = {
      ...defaultState,
      base: 'USD',
      quote: 'EUR',
      firstAmount: 1000,
      secondAmount: 2000,
      rate: 2,
    };
    const expectedState = {
      ...initState,
      base: 'EUR',
      quote: 'USD',
      secondAmount: 500,
      rate: 0.5,
    };
    expect(reducer(initState, action())).toEqual(expectedState);
  });
});