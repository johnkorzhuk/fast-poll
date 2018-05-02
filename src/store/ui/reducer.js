import { TOGGLE_OVERLAY } from './actions';

export const INITIAL_STATE = {
  overlay: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_OVERLAY:
      return {
        ...state,
        overlay: action.payload.isOpen,
      };

    default:
      return state;
  }
};
