import { combineReducers } from 'redux';

import poll from './poll/reducer';
import auth from './auth/reducer';

const appReducer = combineReducers({ poll, auth });

export default (state, action) => {
  if (action.type === 'auth/LOGOUT') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};
