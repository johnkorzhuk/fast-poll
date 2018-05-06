import { combineReducers } from 'redux';

import poll from './poll/reducer';
import auth from './auth/reducer';
import history from './history/reducer';
import ui from './ui/reducer';

const appReducer = combineReducers({ poll, auth, history, ui });

export default (state, action) => {
  if (action.type === 'auth/SIGN_OUT') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};
