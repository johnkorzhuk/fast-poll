import * as utils from '../utils'

describe('history utils', () => {
  const polls = [{
    date: "2018-06-25T23:03:45.174Z",
    id: '124',
    title: 'created poll 3',
    order: 3,
  }, {
    date: "2018-04-25T23:03:45.174Z",
    id: '1',
    title: 'created poll 1',
    order: 1,
  }, {
    date: "2018-05-25T23:03:45.174Z",
    id: '12',
    title: 'created poll 2',
    order: 1,
  }]

  it('sortPollsByProperty sorts polls given a property in acsending order', () => {
    expect(utils.sortPollsByProperty(polls, 'order')).toMatchSnapshot()
  })

  it('sortPollsByProperty sorts polls given a property in descending order', () => {
    expect(utils.sortPollsByProperty(polls, 'order', 'desc')).toMatchSnapshot()
  })

  it('sortPollsByProperty sorts polls by date', () => {
    expect(utils.sortPollsByProperty(polls, 'date')).toMatchSnapshot()
  })
})