import reducer, { INITIAL_STATE } from '../reducer';
import * as actions from '../actions';

describe('poll/options reducer', () => {
  it('should return initial state when undefined state arg', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  describe('handles action creator', () => {
    const state = {
      ...INITIAL_STATE,
      order: ['1', '2', '3'],
      data: {
        '1': {
          id: '1',
          text: '1 poll',
          editing: false,
          votes: 1,
        },
        '3': {
          id: '3',
          text: '',
          editing: false,
          votes: 0,
        },
        '2': {
          id: '2',
          text: '2 poll',
          editing: false,
          votes: 0,
        },
      },
    };

    it('addOptionAction as expected', () => {
      expect(
        reducer(undefined, actions.addOptionAction('1')),
      ).toMatchSnapshot();
    });

    it('removeOptionAction as expected', () => {
      expect(reducer(state, actions.removeOptionAction('1'))).toMatchSnapshot();
    });

    it('updateOptionAction as expected', () => {
      expect(
        reducer(
          state,
          actions.updateOptionAction('1', {
            editing: true,
            text: '1 updated',
            votes: 1,
          }),
        ).data['1'],
      ).toMatchSnapshot();
    });

    it('updateOptionOrderAction as expected', () => {
      expect(
        reducer(state, actions.updateOptionOrderAction(['3', '2', '1'])).order,
      ).toMatchSnapshot();
    });

    it('resetOptionsAction as expected', () => {
      expect(reducer(state, actions.resetOptionsAction())).toEqual(
        INITIAL_STATE,
      );
    });
  });
});
