export const LOADING = 'poll/LOADING'
export const UPDATE_TITLE = 'poll/UPDATE_TITLE'
export const UPDATE_SELECTION = 'poll/UPDATE_SELECTION'
export const UPDATE_VOTED = 'poll/UPDATE_VOTED'

export const loadingAction = (isLoading) => ({
  type: LOADING,
  payload: {
    isLoading
  }
})

export const updateTitleAction = (title) => ({
  type: UPDATE_TITLE,
  payload: {
    title
  }
})

export const updateSelectionAction = (selection) => ({
  type: UPDATE_SELECTION,
  payload: {
    selection
  }
})

export const updateVotedAction = (hasVoted) => ({
  type: UPDATE_VOTED,
  payload: {
    hasVoted
  }
})

export const updateTitle = (title) => (dispatch) => {
  return dispatch(updateTitleAction(title))
}