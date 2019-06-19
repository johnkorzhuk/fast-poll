import { updateOptionAction, updateOptionOrderAction } from './options/actions';
import { addPollsAction } from '../history/actions';
import { navigate } from 'gatsby-link';

export const LOADING = 'poll/LOADING';
export const UPDATE_TITLE = 'poll/UPDATE_TITLE';
export const UPDATE_SELECTION = 'poll/UPDATE_SELECTION';
export const SET_SHOW_RESULTS = 'poll/SET_SHOW_RESULTS';
export const SET_CREATED_POLL = 'poll/SET_CREATED_POLL';
export const SET_OWNER = 'poll/SET_OWNER';
export const RESET_POLL = 'poll/RESET_POLL';

export const loadingAction = isLoading => ({
  type: LOADING,
  payload: {
    isLoading,
  },
});

export const updateTitleAction = title => ({
  type: UPDATE_TITLE,
  payload: {
    title,
  },
});

export const updateSelectionAction = selection => ({
  type: UPDATE_SELECTION,
  payload: {
    selection,
  },
});

export const showResultsAction = showResults => ({
  type: SET_SHOW_RESULTS,
  payload: {
    showResults,
  },
});

export const setCreatedPollAction = id => ({
  type: SET_CREATED_POLL,
  payload: {
    id,
  },
});

export const setOwnerAction = createdBy => ({
  type: SET_OWNER,
  payload: {
    createdBy,
  },
});

export const resetPollAction = () => ({
  type: RESET_POLL,
  payload: null,
});

export const setShowResults = showResults => dispatch => {
  dispatch(showResultsAction(showResults));
};

export const selectOption = id => dispatch => {
  dispatch(updateSelectionAction(id));
};

export const updateTitle = title => dispatch => {
  dispatch(updateTitleAction(title));
};

export const setCreatedPoll = id => dispatch => {
  dispatch(setCreatedPollAction(id));
};

export const resetPoll = () => dispatch => {
  dispatch(resetPollAction());
};

export const createPoll = (firebase, data) => dispatch => {
  const { pollId, options, title, isAuthed, uid } = data;

  dispatch(loadingAction(true));
  dispatch(setCreatedPollAction(pollId));
  dispatch(setOwnerAction(uid));

  navigate(`/poll/${pollId}`);

  // only signed in users, not anonymous users
  if (isAuthed) {
    firebase.users
      .doc(uid)
      .collection('createdPolls')
      .doc(pollId)
      .set({
        id: pollId,
        date: new Date(Date.now()),
        title,
      })
      .then(() => {
        dispatch(
          addPollsAction('created', [
            {
              date: new Date(Date.now() - 100000),
              id: pollId,
              title,
            },
          ]),
        );
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        // TODO: notify the user of the error
      });
  }

  return firebase.polls
    .doc(pollId)
    .set({
      title,
      id: pollId,
      options: options.map(({ text, id }) => ({ text, optionId: id })),
      createdBy: uid,
    })
    .then(() => {
      dispatch(loadingAction(false));
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      // TODO: notify the user of the error
    });
};

export const getInitialPollData = (
  firebase,
  history,
  { pollId, created },
) => dispatch => {
  dispatch(loadingAction(true));

  return firebase.polls
    .doc(pollId)
    .get()
    .then(doc => {
      if (doc.exists) {
        // initial poll data isn't cached
        if (!created) {
          const { title, options, createdBy } = doc.data();
          const order = [];

          dispatch(loadingAction(false));
          dispatch(setOwnerAction(createdBy));
          dispatch(updateTitleAction(title));

          options.forEach(({ optionId: id, ...opt }) => {
            order.push(id);

            dispatch(
              updateOptionAction(id, {
                ...opt,
                id,
                votes: 0,
                editing: false,
              }),
            );
          });

          dispatch(updateOptionOrderAction(order));
        }
      } else {
        history.push('/404');
      }

      dispatch(loadingAction(false));
    })
    .catch(error => {
      dispatch(loadingAction(false));
      // eslint-disable-next-line no-console
      console.error(error);
      // TODO: notify the user of the error
    });
};

export const checkIfUserHasVoted = (firebase, { uid, pollId }) => dispatch => {
  return firebase.polls
    .doc(pollId)
    .collection('results')
    .doc(uid)
    .get()
    .then(doc => {
      if (doc.exists) {
        const { optionId } = doc.data();

        dispatch(updateSelectionAction(optionId));
        dispatch(showResultsAction(true));

        return optionId;
      }
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      // TODO: notify the user of the error
    });
};

export const startListeningToResultChanges = (
  firebase,
  { pollId },
) => dispatch => {
  // return an unsubscribe reference, so that
  // we can stop listening when a component unmounts
  return firebase.polls
    .doc(pollId)
    .collection('results')
    .onSnapshot(
      snapshot => {
        snapshot.docChanges.forEach(change => {
          const { optionId } = change.doc.data();

          if (change.type === 'added') {
            dispatch(
              updateOptionAction(optionId, {
                votes: 1,
              }),
            );
          }
          if (change.type === 'removed') {
            // currently there's no way of changing a user's vote after it
            // has been saved. We could accomplish this by deleting the
            // user's uid document on the results sub-collection. This
            // is where we'd remove the vote from the UI when that'd happen.
          }
        });
      },
      error => {
        // eslint-disable-next-line no-console
        console.error(error);
        // TODO: notify the user of the error
      },
    );
};

export const voteOnPoll = (
  firebase,
  { uid, pollId, selection, isAuthed, title },
) => dispatch => {
  dispatch(showResultsAction(true));

  if (isAuthed) {
    firebase.users
      .doc(uid)
      .collection('votedOnPolls')
      .doc(pollId)
      .set({
        id: pollId,
        date: new Date(Date.now()),
        title,
      })
      .then(() => {
        dispatch(
          addPollsAction('votedOn', [
            {
              date: new Date(Date.now() - 100000),
              id: pollId,
              title,
            },
          ]),
        );
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        // TODO: notify the user of the error
      });
  }

  return firebase.polls
    .doc(pollId)
    .collection('results')
    .doc(uid)
    .set({
      optionId: selection,
      uid,
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      // TODO: notify the user of the error
    });
};
