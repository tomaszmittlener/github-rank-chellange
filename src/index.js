//core
import 'core-js/fn/object/assign';
//react
import React from 'react';
import ReactDOM from 'react-dom';
//redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'
//router
import createHistory from 'history/createBrowserHistory';
//components
import App from './components/App';


const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    router: routerReducer
  }),
  composeWithDevTools(
    applyMiddleware(middleware)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('app'));
