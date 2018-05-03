export const ADD_OPTION = 'poll/options/ADD_OPTION';
export const REMOVE_OPTION = 'poll/options/REMOVE_OPTION';
export const UPDATE_OPTION = 'poll/options/UPDATE_OPTION';
export const UPDATE_OPTION_ORDER = 'poll/options/UPDATE_OPTION_ORDER';
export const RESET_OPTIONS = 'poll/options/RESET_OPTIONS';
export const UPDATE_NEWEST = 'poll/options/UPDATE_NEWEST';

export const addOptionAction = (id, data) => ({
  type: ADD_OPTION,
  payload: {
    id,
    data,
  },
});

export const removeOptionAction = id => ({
  type: REMOVE_OPTION,
  payload: {
    id,
  },
});

export const updateOptionAction = (id, data) => ({
  type: UPDATE_OPTION,
  payload: {
    id,
    data,
  },
});

export const updateOptionOrderAction = order => ({
  type: UPDATE_OPTION_ORDER,
  payload: {
    order,
  },
});

export const resetOptionsAction = () => ({
  type: RESET_OPTIONS,
  payload: null,
});

export const updateNewestAction = data => ({
  type: UPDATE_NEWEST,
  payload: {
    data,
  },
});

export const addOption = (id, newestOption) => (dispatch, getState) => {
  const { data } = getState().poll.options;

  Object.entries(data).forEach(([id, option]) => {
    if (option.text) {
      dispatch(updateOptionAction(id, { editing: false }));
    }
  });

  dispatch(updateNewestAction({ id, text: '' }));
  dispatch(addOptionAction(newestOption.id, newestOption));

  return Promise.resolve();
};

export const updateOptionOrder = order => dispatch => {
  dispatch(updateOptionOrderAction(order));

  return Promise.resolve();
};

export const removeOption = id => dispatch => {
  dispatch(removeOptionAction(id));

  return Promise.resolve();
};

export const updateOption = (id, data) => dispatch => {
  dispatch(updateOptionAction(id, data));

  return Promise.resolve();
};

export const resetOptions = () => dispatch => {
  dispatch(resetOptionsAction());
};

export const updateNewest = data => dispatch => {
  dispatch(updateNewestAction(data));
};
