const initalState = {
  restaurants: [],
  nextPageToken: '',
};

const restaurantsReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'RESET_RESTAURANTS':
      return {
        ...state,
        restaurants: payload.restaurants,
        details: payload.details,
        matches: payload.matches,
        displayMatches: payload.displayMatches,
      };
    case 'AWAITING_LOCATION':
      return {
        ...state,
      };
    case 'SUCESS_LOCATION':
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
};

export default restaurantsReducer;
