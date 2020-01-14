import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { fetchCurrencies } from './actions';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

store.dispatch(fetchCurrencies());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
