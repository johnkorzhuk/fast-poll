export const TOGGLE_OVERLAY = 'ui/TOGGLE_OVERLAY';

export const toggleOverlayAction = isOpen => ({
  type: TOGGLE_OVERLAY,
  payload: {
    isOpen,
  },
});

export const toggleOverlay = isOpen => dispatch => {
  dispatch(toggleOverlayAction(isOpen));
};
