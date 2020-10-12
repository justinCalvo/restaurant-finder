const initalState = {
  cuisineQuery: '',
  cuisineList: [],
  displayCuisines: [],
};

const queryReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_QUERY':
      return {
        cuisineQuery: payload.cuisineQuery,
        cuisineList: payload.cuisineList,
        displayCuisines: payload.displayCuisines,
      };
    default:
      return state;
  }
};

export default queryReducer;
