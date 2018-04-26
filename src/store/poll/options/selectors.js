import { createSelector } from 'reselect';

import { selectShowResults } from '../selectors';

export const selectOptionsOrder = state => state.poll.options.order;
export const selectOptions = state => state.poll.options.data;

export const selectOrderedOptions = createSelector(
  [selectOptionsOrder, selectOptions, selectShowResults],
  (order, options, showResults) => {
    if (showResults) {
      return Object.values(options).sort((a, b) => b.votes - a.votes);
    }

    return order.map(id => options[id]);
  },
);

export const selectTotalVotes = createSelector([selectOptions], options => {
  return Object.values(options).reduce((aggr, curr) => aggr + curr.votes, 0);
});
