//redux
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
//reducers
import reducers from '../reducers';


const middleware = applyMiddleware(routerMiddleware(history));


const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(middleware)
);

export default store
