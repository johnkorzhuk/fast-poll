import { INITIAL_STATE } from '../reducer';
import { INITIAL_STATE as AUTH_INITIAL_STATE } from '../../auth/reducer';
import * as selectors from '../selectors';

describe('poll selectors', () => {
  const getState = (uid, pollId) => {
    return {
      auth: {
        ...AUTH_INITIAL_STATE,
        uid,
      },
      poll: {
        ...INITIAL_STATE,
        data: {
          ...INITIAL_STATE.data,
          createdBy: pollId,
        },
      },
    };
  };

  describe('selectIsOwner', () => {
    it(`returns a boolean indicating if poll is created by user`, () => {
      const uid = '123';
      const pollId = '321';

      expect(selectors.selectIsOwner(getState(uid, uid))).toBe(true);
      expect(selectors.selectIsOwner(getState(uid, pollId))).toBe(false);
    });
  });
});
