// import { createSelector } from 'reselect';

import { selectUid } from '../auth/selectors';

export const selectCreatedBy = state => state.poll.data.createdBy;
export const selectShowResults = state => state.poll.data.showResults;

export const selectIsOwner = state => {
  return selectCreatedBy(state) === selectUid(state);
};
