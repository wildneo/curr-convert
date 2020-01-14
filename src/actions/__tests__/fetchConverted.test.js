import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import * as actions from '../../actions';

jest.mock('axios');
const mockStore = configureMockStore([
  thunk,
]);

describe('fetchConverted', () => {
  const rate = 688.6;
  const getRequest = () => {
    const data = {
      amount: rate,
    };
  
    return axios.request
      .mockResolvedValueOnce({ data })
      .mockRejectedValue();
  };
  
  test('Request success', () => {
    const store = mockStore();
    const expectedActions = [
      actions.fetchConvertedRequest(),
      actions.fetchConvertedSuccess({ rate }),
    ];
    getRequest();
    return store.dispatch(actions.fetchConverted())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
  
  test('Request failure', () => {
    const store = mockStore();
    const expectedActions = [
      actions.fetchConvertedRequest(),
      actions.fetchConvertedFailure(),
    ];
    getRequest();
    return store.dispatch(actions.fetchConverted())
      .catch(() => expect(store.getActions()).toEqual(expectedActions));
  });
  
});
