export const TOGGLE_LOADING = 'history/TOGGLE_LOADING';
export const TOGGLE_EMPTY = 'history/TOGGLE_EMPTY';
export const ADD_POLLS = 'history/ADD_POLLS';

export const toggleLoadingAction = (type, isLoading) => ({
  type: TOGGLE_LOADING,
  payload: {
    type,
    isLoading,
  },
});

export const toggleEmptyAction = (type, isEmpty) => ({
  type: TOGGLE_EMPTY,
  payload: {
    type,
    isEmpty,
  },
});

export const addPollsAction = (type, polls) => ({
  type: ADD_POLLS,
  payload: {
    type,
    polls,
  },
});

export const getPollHistory = (firebase, { uid, type }) => (
  dispatch,
  getState,
) => {
  const LIMIT = 12;
  const userRef = firebase.users.doc(uid);
  const { created, votedOn } = getState().history;
  const createdPromise = userRef
    .collection('createdPolls')
    .where('date', '<', created.lastItemDate)
    .orderBy('date', 'desc')
    .limit(LIMIT);
  const votedOnPromise = userRef
    .collection('votedOnPolls')
    .where('date', '<', votedOn.lastItemDate)
    .orderBy('date', 'desc')
    .limit(LIMIT);
  const dispatchPollData = (pollDoc, type) => {
    const polls = [];

    pollDoc.forEach(doc => {
      polls.push(doc.data());
    });

    dispatch(addPollsAction(type, polls));
    dispatch(toggleEmptyAction(type, pollDoc.empty));
  };

  if (!type) {
    dispatch(toggleLoadingAction('created', true));
    dispatch(toggleLoadingAction('votedOn', true));
    // console.log(toggleLoadingAction('created', true));
    // console.log(toggleLoadingAction('votedOn', true));
    Promise.all([createdPromise.get(), votedOnPromise.get()])
      .then(([created, votedOn]) => {
        dispatchPollData(created, 'created');
        dispatchPollData(votedOn, 'votedOn');
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        // TODO: notify the user of the error
      });
  } else if (type === 'created') {
    dispatch(toggleLoadingAction('created', true));

    createdPromise.get().then(createdDoc => {
      dispatchPollData(createdDoc, 'created');
    });
  } else {
    dispatch(toggleLoadingAction('votedOn', true));

    votedOnPromise.get().then(votedOnDoc => {
      dispatchPollData(votedOnDoc, 'votedOn');
    });
  }

  dispatch(toggleLoadingAction('created', false));
  dispatch(toggleLoadingAction('votedOn', false));
};
