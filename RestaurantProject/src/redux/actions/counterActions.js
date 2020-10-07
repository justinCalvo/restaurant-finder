export const updateCounter = currentCount => dispatch => {
  dispatch({
    type: 'UPDATE_COUNT',
    payload: {
      counter: currentCount,
    },
  });
};
