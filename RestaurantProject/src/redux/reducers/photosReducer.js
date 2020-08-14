const initalState = {
  photos: [],
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
        photos: payload.photos,
      };
    default:
      return state;
  }
};

export default photosReducer;
