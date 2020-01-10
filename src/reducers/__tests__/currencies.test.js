import reducer, { defaultState } from '../currencies';
import * as actions from '../../actions';

describe('Сurrencies', () => {
  test('fetchCurrenciesSuccess', () => {
    const action = actions.fetchCurrenciesSuccess;
    const payload = {
      currencies: [
        { code:'USD', name: 'US Dollar' },
        { code:'EUR', name: 'Euro' },
      ],
    };
    const expectedState = {
      byCode: {
        USD: { code:'USD', name: 'US Dollar' },
        EUR: { code:'EUR', name: 'Euro' },
      },
      allCodes: ['USD', 'EUR'],
    };
    expect(reducer(defaultState, action(payload))).toEqual(expectedState);
  });
});