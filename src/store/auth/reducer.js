import { SIGN_IN, SIGN_OUT, LOADING } from './actions';

export const INITIAL_STATE = {
  loading: false,
  uid: '',
  isAnonymous: null,
  photoURL: '',
  // // some other properties from the user object that may be useful
  // email: '',
  // displayName: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    case SIGN_OUT:
      return INITIAL_STATE;

    case LOADING:
      return {
        ...state,
        loading: action.payload.isLoading,
      };

    default:
      return state;
  }
};
