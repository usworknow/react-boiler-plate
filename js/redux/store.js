import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const INITIAL_STATES = undefined;

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(rootReducer, INITIAL_STATES, composeEnhancers(applyMiddleware(thunk)));

export default store;
