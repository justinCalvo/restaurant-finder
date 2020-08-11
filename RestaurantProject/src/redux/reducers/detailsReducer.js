const initalState = {
  details: [],
};

const detailsReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'AWAITING_DETAILS':
      return {
        ...state,
      };
    case 'AWAITING_INITIAL_PHOTOS':
      return {
        ...state,
      };
    case 'REJECTED_DETAILS':
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

export default detailsReducer;
