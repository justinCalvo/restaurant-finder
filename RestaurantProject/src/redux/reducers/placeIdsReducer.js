const initalState = {
  placeIds: [],
  nextPageToken: '',
};

const placeIdsReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'RESET_PLACE_IDS':
      return {
        ...state,
        placeIds: payload.placeIds,
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
    case 'AWAITING_PLACE_IDS':
      return {
        ...state,
      };
    case 'REJECTED_PLACE_IDS':
      return {
        ...state,
      };
    case 'SUCCESS_PLACE_IDS':
      return {
        ...state,
        placeIds: payload.placeIds,
        nextPageToken: payload.nextPageToken,
      };
    case 'AWAITING_NEXT_TWENTY_PLACE_IDS':
      return {
        ...state,
      };
    case 'SUCCESS_NEXT_TWENTY_PLACE_IDS':
      return {
        ...state,
        placeIds: payload.placeIds,
        nextPageToken: payload.nextPageToken,
      };
    case 'REJECTED_NEXT_TWENTY_PLACE_IDS':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default placeIdsReducer;
