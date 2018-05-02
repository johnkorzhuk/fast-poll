import { INITIAL_STATE } from '../reducer';
import * as selectors from '../selectors';

describe('history selectors', () => {
  const state = {
    history: {
      ...INITIAL_STATE,
      created: [
        {
          date: '2018-06-25T23:03:45.174Z',
          id: '124',
          title: 'created poll 3',
        },
        {
          date: '2018-04-25T23:03:45.174Z',
          id: '1',
          title: 'created poll 1',
        },
        {
          date: '2018-05-25T23:03:45.174Z',
          id: '12',
          title: 'created poll 2',
        },
      ],
    },
  };

  it(`selectSortedPolls selects sorted polls given a selector`, () => {
    expect(
      selectors.selectSortedPolls(selectors.selectCreatedPolls)(state),
    ).toMatchSnapshot();
  });
});
