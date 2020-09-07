export const updateType = type => dispatch => {
  dispatch({
    type: 'UPDATE_TYPE',
    payload: {
      typeName: type,
    },
  });
};
