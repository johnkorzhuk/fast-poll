import { TOGGLE_LOADING, ADD_POLLS, TOGGLE_EMPTY } from './actions';

export const INITIAL_STATE = {
  created: {
    polls: [],
    lastItemDate: new Date(Date.now()),
    loading: false,
    empty: false,
  },
  votedOn: {
    polls: [],
    lastItemDate: new Date(Date.now()),
    loading: false,
    empty: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          loading: action.payload.isLoading,
        },
      };

    case TOGGLE_EMPTY:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          empty: action.payload.isEmpty,
        },
      };

    case ADD_POLLS:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          polls: [...state[action.payload.type].polls, ...action.payload.polls],
          lastItemDate:
            action.payload.polls.length > 0
              ? action.payload.polls[action.payload.polls.length - 1].date
              : state[action.payload.type].lastItemDate,
        },
      };

    default:
      return state;
  }
};
