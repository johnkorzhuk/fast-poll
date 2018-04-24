/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

let middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware]
  // middleware = [...middleware, logger];
}

export default () =>
  createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
