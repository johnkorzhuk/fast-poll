import { createSelector } from 'reselect';

import { sortPollsByProperty } from './utils';

export const selectCreatedPolls = state => state.history.created.polls;
export const selectVotedOnPolls = state => state.history.votedOn.polls;

export const selectSortedPolls = pollSelector =>
  createSelector([pollSelector], polls => {
    return sortPollsByProperty(polls, 'date');
  });
