import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import * as actions from '../../actions';

jest.mock('axios');
const mockStore = configureMockStore([
  thunk,
]);

describe('fetchCurrencies', () => {
  const rate = 688.6;
  const currencies = [{
    code: 'USD',
    name: 'United States dollar',
    symbol: '$',
  }];
  const getRequest = () => (
    axios.request
      .mockResolvedValueOnce({ data: { currencies } })
      .mockResolvedValueOnce({ data: { amount: rate, } })
      .mockRejectedValue()
  );
  
  test('Request success', () => {
    const store = mockStore();
    const expectedActions = [
      actions.fetchCurrenciesRequest(),
      actions.fetchConvertedRequest(),
      actions.fetchConvertedSuccess({ rate }),
      actions.fetchCurrenciesSuccess({ currencies }),
    ];
    getRequest();
    return store.dispatch(actions.fetchCurrencies())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
  
  test('Request failure', () => {
    const store = mockStore();
    const expectedActions = [
      actions.fetchCurrenciesRequest(),
      actions.fetchConvertedRequest(),
      actions.fetchConvertedFailure(),
      actions.fetchCurrenciesFailure(),
    ];
    getRequest();
    return store.dispatch(actions.fetchCurrencies())
      .catch(() => expect(store.getActions()).toEqual(expectedActions));
  });
  
});
