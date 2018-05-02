import reducer, { INITIAL_STATE } from '../reducer';
import { INITIAL_STATE as OPTIONS_INITIAL_STATE } from '../options/reducer';
import * as actions from '../actions';

describe('poll reducer', () => {
  it('should return initial state when undefined state arg', () => {
    expect(reducer(undefined, {})).toEqual({
      data: {
        ...INITIAL_STATE,
      },
      options: {
        ...OPTIONS_INITIAL_STATE,
      },
    });
  });

  describe('handles action creator', () => {
    it('loadingAction as expected', () => {
      expect(reducer(undefined, actions.loadingAction(true)).data.loading).toBe(
        true,
      );
    });

    it('updateTitleAction as expected', () => {
      const newTitle = 'new title';
      expect(
        reducer(undefined, actions.updateTitleAction(newTitle)).data.title,
      ).toBe(newTitle);
    });

    it('updateSelectionAction as expected', () => {
      const selection = '1';
      expect(
        reducer(undefined, actions.updateSelectionAction(selection)).data
          .selection,
      ).toBe(selection);
    });

    it('showResultsAction as expected', () => {
      expect(
        reducer(undefined, actions.showResultsAction(true)).data.showResults,
      ).toBe(true);
    });

    it('setCreatedPollAction as expected', () => {
      const created = '1';
      expect(
        reducer(undefined, actions.setCreatedPollAction(created)).data.created,
      ).toBe(created);
    });

    it('setOwnerAction as expected', () => {
      const uid = '123';
      expect(
        reducer(undefined, actions.setOwnerAction(uid)).data.createdBy,
      ).toBe(uid);
    });

    it('resetPollAction as expected', () => {
      expect(reducer(undefined, actions.resetPollAction())).toEqual({
        data: {
          ...INITIAL_STATE,
        },
        options: {
          ...OPTIONS_INITIAL_STATE,
        },
      });
    });
  });
});
