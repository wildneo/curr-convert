import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const fetchCurrenciesState = handleActions({
  [actions.fetchCurrenciesRequest]: () => 'requested',
  [actions.fetchCurrenciesFailure]: () => 'failed',
  [actions.fetchCurrenciesSuccess]: () => 'finished',
}, 'none');

export const fetchConvertState = handleActions({
  [actions.fetchConvertedRequest]: () => 'requested',
  [actions.fetchConvertedFailure]: () => 'failed',
  [actions.fetchConvertedSuccess]: () => 'finished',
}, 'none');