export const updateQuery = (query, list, cuisines) => dispatch => {
  dispatch({
    type: 'UPDATE_QUERY',
    payload: {
      cuisineQuery: query,
      cuisineList: list,
      displayCuisines: cuisines,
    },
  });
};
