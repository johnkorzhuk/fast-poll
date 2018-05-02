import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { INITIAL_STATE } from '../reducer';
import * as actions from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('poll bound actions', () => {
  it('setShowResults', () => {
    const store = mockStore(INITIAL_STATE);
    store.dispatch(actions.setShowResults(true));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('selectOption', () => {
    const store = mockStore(INITIAL_STATE);
    store.dispatch(actions.selectOption('1'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('updateTitle', () => {
    const store = mockStore(INITIAL_STATE);
    store.dispatch(actions.updateTitle('new title'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('setCreatedPoll', () => {
    const store = mockStore(INITIAL_STATE);
    store.dispatch(actions.setCreatedPoll('1'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('resetPoll', () => {
    const store = mockStore(INITIAL_STATE);
    store.dispatch(actions.resetPoll());
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('poll async bound actions', () => {
  // TODO: figure out how to mock firebase
});
