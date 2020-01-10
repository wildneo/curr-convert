import { handleActions } from 'redux-actions';
import { keyBy } from 'lodash';
import * as actions from '../actions';

export const defaultState = { byCode: {}, allCodes: [] };

export default handleActions({
  [actions.fetchCurrenciesSuccess]: (state, { payload }) => ({
    ...state,
    byCode: keyBy(payload.currencies, 'code'),
    allCodes: payload.currencies.map((currensy) => currensy.code),
  }),
}, defaultState);