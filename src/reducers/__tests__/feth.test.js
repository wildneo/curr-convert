import { fetchCurrenciesState, fetchConvertState } from '../feth';
import * as actions from '../../actions';

describe('Fetch', () => {
  const defaultState = 'none';
  test('fetchCurrenciesState', () => {
    const request = actions.fetchCurrenciesRequest;
    const failure = actions.fetchCurrenciesFailure;
    const success = actions.fetchCurrenciesSuccess;
    expect(fetchCurrenciesState(defaultState, request())).toBe('requested');
    expect(fetchCurrenciesState(defaultState, failure())).toBe('failed');
    expect(fetchCurrenciesState(defaultState, success())).toBe('finished');
  });
  test('fetchConvertState', () => {
    const request = actions.fetchConvertedRequest;
    const failure = actions.fetchConvertedFailure;
    const success = actions.fetchConvertedSuccess;
    expect(fetchConvertState(defaultState, request())).toBe('requested');
    expect(fetchConvertState(defaultState, failure())).toBe('failed');
    expect(fetchConvertState(defaultState, success())).toBe('finished');
  });
});