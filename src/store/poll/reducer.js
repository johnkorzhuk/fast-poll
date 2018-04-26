import { combineReducers } from 'redux';

import optionsReducer from './options/reducer';
import {
  LOADING,
  UPDATE_TITLE,
  UPDATE_SELECTION,
  SET_SHOW_RESULTS,
  SET_CREATED_POLL,
  SET_OWNER,
  RESET_POLL,
} from './actions';

export const INITIAL_STATE = {
  loading: false,
  title: '',
  selection: '',
  showResults: false,
  created: '',
  createdBy: '',
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload.isLoading,
      };

    case UPDATE_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };

    case UPDATE_SELECTION:
      return {
        ...state,
        selection: action.payload.selection,
      };

    case SET_SHOW_RESULTS:
      return {
        ...state,
        showResults: action.payload.showResults,
      };

    case SET_CREATED_POLL:
      return {
        ...state,
        created: action.payload.id,
      };

    case SET_OWNER:
      return {
        ...state,
        createdBy: action.payload.createdBy,
      };

    case RESET_POLL:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default combineReducers({ data: rootReducer, options: optionsReducer });
