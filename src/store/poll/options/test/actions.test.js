import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from '../actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('poll/options bound actions', () => {
  const state = {
    poll: {
      options: {
        order: ['1', '2', '3'],
        data: {
          '1': {
            id: '1',
            text: '1 poll',
            editing: false,
            votes: 0
          },
          '3': {
            id: '3',
            text: '',
            editing: false,
            votes: 0
          },
          '2': {
            id: '2',
            text: '2 poll',
            editing: false,
            votes: 0
          },
        }
      }
    }
  }
  
  it('addOptionremoves any options with no text when adding a new option', () => {
    const store = mockStore(state)
    store.dispatch(actions.addOption('4'))
    expect(store.getActions()).toMatchSnapshot()
  })

  it('updateOptionOrder', () => {
    const store = mockStore(state)
    store.dispatch(actions.updateOptionOrder(['3', '2', '1']))
    expect(store.getActions()).toMatchSnapshot()
  })

  it('removeOptionremoves', () => {
    const store = mockStore(state)
    store.dispatch(actions.removeOption('3'))
    expect(store.getActions()).toMatchSnapshot()
  })

  it('updateOption', () => {
    const store = mockStore(state)
    store.dispatch(actions.updateOption('3' , { editing: true, text: '3 updated' }))
    expect(store.getActions()).toMatchSnapshot()
  })

  it('resetOptions', () => {
    const store = mockStore(state)
    store.dispatch(actions.resetOptions())
    expect(store.getActions()).toMatchSnapshot()
  })
})