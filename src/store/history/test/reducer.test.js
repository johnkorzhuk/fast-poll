import reducer, { INITIAL_STATE } from '../reducer';
import * as actions from '../actions';

describe('history reducer', () => {
  it('should return initial state when undefined state arg', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle a addPollsAction action creator as expected', () => {
    const voted = {
      date: '2018-04-25T23:03:45.174Z',
      id: '123',
      title: 'voted poll',
    };
    const created = {
      date: '2018-04-25T23:03:45.174Z',
      id: '321',
      title: 'created poll',
    };

    expect(
      reducer(undefined, actions.addPollsAction('votedOn', [voted])).votedOn,
    ).toEqual([voted]);
    expect(
      reducer(undefined, actions.addPollsAction('created', [created])).created,
    ).toEqual([created]);
  });

  it('should handle a loadingAction action creator as expected', () => {
    expect(reducer(undefined, actions.loadingAction(true)).loading).toBe(true);
  });
});
