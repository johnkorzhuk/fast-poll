import { INITIAL_STATE } from '../reducer'
import * as selectors from '../selectors'

describe('auth selectors', () => {
  const unAuthedState = {
    auth: INITIAL_STATE
  }

  const authedState = {
    auth: {
      loading: false,
      uid: '123',
      isAnonymous: false,
      photoURL: 'www.google.com',
    }
  }

  it(`selectAuthedState selects a user's authed state`, () => {
    expect(selectors.selectAuthedState(unAuthedState)).toEqual(false)
    expect(selectors.selectAuthedState(authedState)).toEqual(true)
  })
})
