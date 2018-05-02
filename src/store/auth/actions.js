import { toggleOverlayAction } from '../ui/actions';

export const SIGN_IN = 'auth/SIGN_IN';
export const SIGN_OUT = 'auth/SIGN_OUT';
export const LOADING = 'auth/LOADING';

export const signInAction = ({ uid, isAnonymous, photoURL }) => ({
  type: SIGN_IN,
  payload: {
    uid,
    isAnonymous,
    photoURL,
  },
});

export const signOutAction = () => ({
  type: SIGN_OUT,
  payload: null,
});

export const loadingAction = isLoading => ({
  type: LOADING,
  payload: {
    isLoading,
  },
});

export const setAuthLoading = isLoading => dispatch => {
  dispatch(loadingAction(isLoading));
};

export const signIn = (firebase, provider) => dispatch => {
  dispatch(loadingAction(true));
  switch (provider) {
    // the auth listener will handle the success cases
    case 'google':
      return firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          dispatch(loadingAction(false));
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          // TODO: notify the user of the error
          return error;
        });

    case 'anonymous':
      return firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          dispatch(loadingAction(false));
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          // TODO: notify the user of the error
          return error;
        });

    default:
      const reason = 'Invalid provider passed to signIn method';
      // eslint-disable-next-line no-console
      console.error(reason);
      return Promise.reject(reason);
  }
};

export const signOut = firebase => dispatch => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(signOutAction());
      dispatch(toggleOverlayAction(false));
    });
};

export const startListeningToAuthChanges = firebase => dispatch => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // if user exists sign-in!
      dispatch(signInAction(user));
      dispatch(loadingAction(false));
    } else {
      // otherwise sign-out!
      dispatch(signOutAction());
      dispatch(loadingAction(false));
      dispatch(toggleOverlayAction(false));
    }
  });
};
