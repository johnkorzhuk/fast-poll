import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { INITIAL_STATE } from '../reducer';
import * as actions from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('poll bound actions', () => {
  it('toggleOverlay', () => {
    const store = mockStore(INITIAL_STATE);
    store.dispatch(actions.toggleOverlay(true));
    expect(store.getActions()).toMatchSnapshot();
  });
});
