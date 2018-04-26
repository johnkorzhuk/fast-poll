export const TOGGLE_HEADER_NAV = 'ui/TOGGLE_HEADER_NAV'

export const toggleHeaderNavAction = (isOpen) => ({
  type: TOGGLE_HEADER_NAV,
  payload: {
    isOpen
  }
})

export const toggleHeaderNav = (isOpen) => (dispatch) => {
  dispatch(toggleHeaderNavAction(isOpen))
}