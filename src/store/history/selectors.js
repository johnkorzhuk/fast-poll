import { createSelector } from 'reselect';

import { sortPollsByProperty } from './utils';

export const selectCreatedPolls = state => state.history.created;
export const selectVotedOnPolls = state => state.history.votedOn;

export const selectSortedPolls = selector =>
  createSelector([selector], polls => {
    return sortPollsByProperty(polls, 'date');
  });
