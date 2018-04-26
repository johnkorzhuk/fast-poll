export const LOADING = 'history/LOADING';
export const ADD_POLLS = 'history/ADD_POLLS';

export const loadingAction = isLoading => ({
  type: LOADING,
  payload: {
    isLoading,
  },
});

export const addPollsAction = (type, polls) => ({
  type: ADD_POLLS,
  payload: {
    type,
    polls,
  },
});

export const getPollHistory = (firebase, { uid }) => dispatch => {
  const LIMIT = 12;
  const userRef = firebase.users.doc(uid);

  dispatch(loadingAction(true));

  return Promise.all([
    userRef
      .collection('createdPolls')
      .orderBy('date')
      .limit(LIMIT)
      .get(),
    userRef
      .collection('votedOnPolls')
      .orderBy('date')
      .limit(LIMIT)
      .get(),
  ])
    .then(([created, votedOn]) => {
      const createdPolls = [];
      const votedOnPolls = [];

      created.forEach(doc => {
        createdPolls.push(doc.data());
      });
      votedOn.forEach(doc => {
        votedOnPolls.push(doc.data());
      });

      dispatch(loadingAction(false));
      dispatch(addPollsAction('created', createdPolls));
      dispatch(addPollsAction('votedOn', votedOnPolls));

      return [
        created.docs[created.docs.length - 1],
        votedOn.docs[votedOn.docs.length - 1],
      ];
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      // TODO: notify the user of the error
    });
};
