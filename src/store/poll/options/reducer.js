import {
  ADD_OPTION,
  REMOVE_OPTION,
  UPDATE_OPTION,
  UPDATE_OPTION_ORDER,
  RESET_OPTIONS,
  UPDATE_NEWEST,
} from './actions';

export const INITIAL_STATE = {
  // [optionId]
  order: [],
  // options is a map with the optionId as the keys and
  // option data including results as the values
  data: {},
  newest: {
    id: null,
    text: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_OPTION:
      return {
        ...state,
        order: [...state.order, action.payload.id],
        data: {
          ...state.data,
          [action.payload.id]: {
            id: action.payload.id,
            editing: false,
            votes: 0,
            ...action.payload.data,
          },
        },
      };

    case REMOVE_OPTION:
      const { [action.payload.id]: removedOption, ...newOptions } = state.data;

      return {
        ...state,
        data: newOptions,
        order: state.order.filter(id => id !== action.payload.id),
      };

    case UPDATE_OPTION:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            ...Object.keys(action.payload.data).reduce((aggr, curr) => {
              if (curr === 'votes') {
                // eslint-disable-next-line no-param-reassign
                aggr.votes =
                  action.payload.id in state.data &&
                  'votes' in state.data[action.payload.id]
                    ? state.data[action.payload.id].votes +
                      action.payload.data.votes
                    : action.payload.data.votes;
              } else {
                // eslint-disable-next-line no-param-reassign
                aggr[curr] = action.payload.data[curr];
              }
              return aggr;
            }, {}),
          },
        },
      };

    case UPDATE_OPTION_ORDER:
      return {
        ...state,
        order: [...action.payload.order],
      };

    case UPDATE_NEWEST:
      return {
        ...state,
        newest: {
          ...state.newest,
          ...action.payload.data,
        },
      };

    case RESET_OPTIONS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
