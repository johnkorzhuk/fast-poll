import { LOADING, ADD_POLLS } from './actions';

export const INITIAL_STATE = {
  created: [],
  votedOn: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload.isLoading,
      };

    case ADD_POLLS:
      return {
        ...state,
        [action.payload.type]: [
          ...state[action.payload.type],
          ...action.payload.polls,
        ],
      };

    default:
      return state;
  }
};
