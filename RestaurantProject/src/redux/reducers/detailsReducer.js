const initalState = {
  details: [],
};

const detailsReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'AWAITING_PHOTOS':
      return {
        ...state,
      };
    case 'SUCCESS_PHOTOS':
      return {
        ...state,
        details: payload.details,
      };
    case 'AWAITING_DETAILS':
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
    case 'REJECTED_DETAILS':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default detailsReducer;
