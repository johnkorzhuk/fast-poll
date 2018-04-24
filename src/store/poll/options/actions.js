export const ADD_OPTION = 'poll/options/ADD_OPTION'
export const REMOVE_OPTION = 'poll/options/REMOVE_OPTION'
export const UPDATE_OPTION = 'poll/options/UPDATE_OPTION'
export const UPDATE_OPTION_ORDER = 'poll/options/UPDATE_OPTION_ORDER'

export const addOptionAction = (id) => ({
  type: ADD_OPTION,
  payload: {
    id,
  }
})

export const removeOptionAction = (id) => ({
  type: REMOVE_OPTION,
  payload: {
    id
  }
})

export const updateOptionAction = (id, data) => ({
  type: UPDATE_OPTION,
  payload: {
    id,
    data,
  }
})

export const updateOptionOrderAction = (order) => ({
  type: UPDATE_OPTION_ORDER,
  payload: {
    order
  }
})

export const addOption = (id) => (dispatch, getState) => {
  const { data } = getState().poll.options
  // remove any options that dont have text when adding a new one
  Object.entries(data).forEach(([id, option]) => {
    if (!option.text) {
      dispatch(removeOptionAction(id))
    } else {
      dispatch(updateOptionAction(id, { editing: false }))
    }
  })

  dispatch(addOptionAction(id))
}

export const updateOptionOrder = (order) => (dispatch) => {
  dispatch(updateOptionOrderAction(order))
}

export const removeOption = (id) => (dispatch) => {
  dispatch(removeOptionAction(id))
}

export const updateOption = (id, data) => (dispatch) => {
  dispatch(updateOptionAction(id, data))
}