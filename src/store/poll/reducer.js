import { combineReducers } from 'redux'

import optionsReducer from './options/reducer'
import { LOADING, UPDATE_TITLE, UPDATE_SELECTION, UPDATE_VOTED } from './actions'

const INITIAL_STATE = {
  loading: false,
  title: '',
  selection: '',
  hasVoted: false,
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload.isLoading
      }

    case UPDATE_TITLE:
      return {
        ...state,
        title: action.payload.title
      }

    case UPDATE_SELECTION:
      return {
        ...state,
        selection: action.payload.selection
      }

    case UPDATE_VOTED:
      return {
        ...state,
        hasVoted: action.payload.hasVoted
      }

    default:
      return state;
  }
};

export default combineReducers({ data: rootReducer, options: optionsReducer })