const initalState = {
  restaurants: [],
  details: [],
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
    case 'AWAITING_DETAILS':
      return {
        ...state,
      };
    case 'REJECTED_DETAILS':
      return {
        ...state,
      };
    case 'AWAITING_INITIAL_PHOTOS':
      return {
        ...state,
      };
    case 'SUCCESS_DETAILS':
      return {
        ...state,
        details: payload.details,
      };
    default:
      return state;
  }
};

export default restaurantsReducer;
