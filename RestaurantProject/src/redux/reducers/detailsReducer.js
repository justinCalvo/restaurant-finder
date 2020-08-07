const initalState = {
  details: [],
};

const detailsReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    // case 'RESET_DETAILS':
    //   return {
    //     ...state,
    //     details: payload.details,
    //   };
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
  return state;
};

export default detailsReducer;
