import { INITIAL_STATE } from '../reducer';
import * as selectors from '../selectors';

describe('poll/options selectors', () => {
  const getState = showResults => {
    return {
      poll: {
        data: {
          showResults,
        },
        options: {
          ...INITIAL_STATE,
          order: ['1', '2', '3'],
          data: {
            '1': {
              id: '1',
              text: '1 poll',
              editing: false,
              votes: 2,
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
              votes: 1,
            },
          },
        },
      },
    };
  };

  describe('selectOrderedOptions', () => {
    it(`selects and sorts options while editing`, () => {
      expect(selectors.selectOrderedOptions(getState(false))).toMatchSnapshot();
    });

    it(`selects and sorts options after voted`, () => {
      expect(selectors.selectOrderedOptions(getState(true))).toMatchSnapshot();
    });
  });
});
