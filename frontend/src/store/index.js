import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/';

import actions from '../actions/';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)),
);

store.dispatch(actions.getCategories());

export default store;
