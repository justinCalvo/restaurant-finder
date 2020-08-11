const initalState = {
  details: [],
};

const photosReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'AWAITING_PHOTOS':
      return {
        ...state,
      };
    case 'REJECTED_PHOTOS':
      return {
        ...state,
      };
    case 'SUCCESS_PHOTOS':
      return {
        ...state,
        details: payload.details,
      };
    default:
      return state;
  }
};

export default photosReducer;
