import reducer, { defaultState } from '../convert';
import * as actions from '../../actions';

describe('Convert', () => {
  test('fetchCurrenciesSuccess', () => {
    const action = actions.fetchCurrenciesSuccess;
    const payload = {
      convert: {
        base: 'USD',
        quote: 'EUR',
        startAmount: 100,
        rate: 0.5,
      },
    };
    const initState = defaultState;
    const expectedState = {
      ...defaultState,
      base: 'USD',
      quote: 'EUR',
      firstAmount: 100,
      secondAmount: 50,
      rate: 0.5,
    };
    expect(reducer(initState, action(payload))).toEqual(expectedState);
  });

  test('fetchConvertedSuccess', () => {
    const action = actions.fetchConvertedSuccess;
    const rate = 2;
    const initState = {
      ...defaultState,
      firstAmount: 100,
    };
    const expectedState = {
      ...initState,
      secondAmount: 200,
      rate,
    };
    expect(reducer(initState, action({ rate }))).toEqual(expectedState);
  });

  test('setBaseCurrency', () => {
    const action = actions.setBaseCurrency;
    const value = 'RUB';
    const initState = defaultState;
    const expectedState = {
      ...initState,
      base: value,
    };
    expect(reducer(initState, action({ value }))).toEqual(expectedState);
  });

  test('setQuoteCurrency', () => {
    const action = actions.setQuoteCurrency;
    const value = 'RUB';
    const payload = { value };
    const initState = defaultState;
    const expectedState = {
      ...initState,
      quote: value,
    };
    expect(reducer(initState, action(payload))).toEqual(expectedState);
  });

  test('setFirstAmount', () => {
    const action = actions.setFirstAmount;
    const value = 100;
    const rate = 2;
    const payload = { value };
    const initState = {
      ...defaultState,
      rate,
    };
    const expectedState = {
      ...initState,
      mode: 'first',
      firstAmount: value,
      secondAmount: value * rate,
    };
    expect(reducer(initState, action(payload))).toEqual(expectedState);
  });

  test('setSecondAmount', () => {
    const action = actions.setSecondAmount;
    const value = 100;
    const rate = 2;
    const payload = { value };
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
    expect(reducer(initState, action(payload))).toEqual(expectedState);
  });

  test('switchInputs', () => {
    const action = actions.switchInputs;
    const initState = {
      ...defaultState,
      base: 'USD',
      quote: 'EUR',
      firstAmount: 100,
      secondAmount: 200,
      rate: 2,
    };
    const expectedState = {
      ...initState,
      base: 'EUR',
      quote: 'USD',
      secondAmount: 50,
      rate: 0.5,
    };
    expect(reducer(initState, action())).toEqual(expectedState);
  });
});