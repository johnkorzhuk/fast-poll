import reducer, { INITIAL_STATE } from '../reducer';
import * as actions from '../actions';

describe('auth reducer', () => {
  it('should return initial state when undefined state arg', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle a signInAction action creator as expected', () => {
    const data = {
      uid: '123',
      photoURL: 'www.google.com',
      isAnonymous: false,
      loading: false,
    };

    expect(reducer(undefined, actions.signInAction({ ...data }))).toEqual(data);
  });

  it('should handle a signOutAction action creator as expected', () => {
    expect(reducer(undefined, actions.signOutAction())).toEqual(INITIAL_STATE);
  });

  it('should handle a loadingAction action creator as expected', () => {
    expect(reducer(undefined, actions.loadingAction(true)).loading).toBe(true);
  });
});
