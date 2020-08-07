const initalState = {
  restaurants: [],
  nextPageToken: '',
};

const locationReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'RESET_RESTAURANTS':
      return {
        ...state,
        restaurants: payload.restaurants,
      };
    case 'AWAITING_LOCATION':
      return {
        ...state,
      };
    case 'AWAITING_RESTAURANTS':
      return {
        ...state,
      };
    case 'REJECTED_RESTAURANTS':
      return {
        ...state,
      };
    case 'SUCCESS_RESTAURANTS':
      return {
        ...state,
        restaurants: payload.restaurants,
        nextPageToken: payload.nextPageToken,
      };
    default:
      return state;
  }
  return state;
};

export default locationReducer;
