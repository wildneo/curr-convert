import reducer, { defaultState } from '../search';
import * as actions from '../../actions';

describe('Search', () => {
  test('setSearchQuery', () => {
    const action = actions.setSearchQuery;
    const value = 'Dollar';
    const payload = { value };
    const expectedState = {
      ...defaultState,
      searchQuery: value,
    };
    expect(reducer(defaultState, action(payload))).toEqual(expectedState);
  });

  test('clearSearchQuery', () => {
    const action = actions.clearSearchQuery;
    const initState = {
      ...defaultState,
      searchQuery: 'Euro',
    };
    expect(reducer(initState, action())).toEqual(defaultState);
  });
});