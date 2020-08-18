const initalState = {
  matches: {},
  displayMatches: [],
  newMatchesCounter: 0,
};

const matchesReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'RESET_MATCHES_COUNTER':
      return {
        ...state,
        newMatchesCounter: 0,
      };
    case 'AWAITING_MATCHES':
      return {
        ...state,
      };
    case 'SUCCESS_MATCHES':
      return {
        ...state,
        matches: payload.matches,
        displayMatches: payload.displayMatches,
        newMatchesCounter: payload.newMatchesCounter,
      };
    case 'REJECTED_MATCHES':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default matchesReducer;
