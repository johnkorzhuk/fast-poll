import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { INITIAL_STATE } from '../reducer'
import * as actions from '../actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('poll bound actions', () => {
  it('toggleHeaderNav', () => {
    const store = mockStore(INITIAL_STATE)
    store.dispatch(actions.toggleHeaderNav(true))
    expect(store.getActions()).toMatchSnapshot()
  })
})