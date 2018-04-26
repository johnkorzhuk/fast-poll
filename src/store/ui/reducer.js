import { TOGGLE_HEADER_NAV } from './actions'

export const INITIAL_STATE = {
  headerNav: {
    isOpen: false
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_HEADER_NAV:
      return {
        ...state,
        headerNav: {
          ...state.headerNav,
          isOpen: action.payload.isOpen
        }
      }
  
    default:
      return state
  }
}