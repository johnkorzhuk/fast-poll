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

export const createPoll = (firebase, history, data) => dispatch => {
  const { pollId, options, title } = data

  dispatch(loadingAction(true))

  return firebase.polls
    .doc(pollId)
    .set({
      title,
      id: pollId,
      options: options.map(({ text, id }) => ({ text, optionId: id })),
    })
    .then(() => {
      dispatch(loadingAction(true))

      history.push(`/poll/${pollId}`);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      // TODO: notify the user of the error
    });
}