//core
import 'core-js/fn/object/assign';
//react
import React from 'react';
import ReactDOM from 'react-dom';
//redux
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import store from './stores/store'
//router
import createHistory from 'history/createBrowserHistory';
//components
import App from './components/App';


const history = createHistory();
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>, document.getElementById('app'));





