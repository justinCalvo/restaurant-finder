export const updateNotified = bool => dispatch => {
  dispatch({
    type: 'UPDATE_NOTIFICATION',
    payload: {
      notified: bool,
    },
  });
};
