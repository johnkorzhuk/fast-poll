import { createSelector } from 'reselect'

export const selectOptionsOrder = (state) => state.poll.options.order
export const selectOptions = (state) => state.poll.options.data

export const selectOrderedOptions = createSelector([
  selectOptionsOrder,selectOptions
], (order, options) => {
  return order.map((id) => {
    return options[id]
  })
})