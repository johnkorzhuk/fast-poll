import { createSelector } from 'reselect';

export const selectUid = state => state.auth.uid;
export const selectIsAnonymous = state => state.auth.isAnonymous;

export const selectAuthedState = createSelector(
  [selectUid, selectIsAnonymous],
  (uid, isAnonymous) => {
    // If uid doesn't exist in state, the user is not signed in.
    // A uid will exist if the user is signed in anonymously.
    // We'll consider anonymous users as unauthed for this variable.
    return !!(uid && !isAnonymous);
  },
);
