import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { INITIAL_STATE } from '../reducer';
import * as actions from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth bound actions', () => {
  it('setAuthLoading', () => {
    const store = mockStore(INITIAL_STATE);

    store.dispatch(actions.setAuthLoading(true));
    expect(store.getActions()).toMatchSnapshot();
  });
});

xdescribe('auth async bound actions', () => {
  // TODO: figure out how to mock firebase
});
