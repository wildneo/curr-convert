import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const defaultState = { searchQuery: '' };

export default handleActions({
  [actions.setSearchQuery]: (state, { payload: { value } }) => ({
    ...state,
    searchQuery: value,
  }),

  [actions.clearSearchQuery]: () => defaultState,
}, defaultState);