export const setMatches = (restaurants, index, matches) => dispatch => {
  try {
    dispatch({
      type: 'RESET_MATCHES_COUNTER',
    });

    if (!restaurants && !index) {
      var counter = 0;
    }
    dispatch({
      type: 'SUCCESS_RESET',
      payload: {
        newMatchesCounter: counter ? counter : 0,
      },
    });

    dispatch({
      type: 'AWAITING_MATCHES',
    });

    let matchObj;
    if (!matches.matches) {
      matchObj = {};
      matchObj[restaurants[index].place_id] = [index, 1];
    } else {
      matchObj = matches.matches;
      matchObj[restaurants[index].place_id] = [index, 1];
    }

    dispatch({
      type: 'SUCCESS_MATCHES',
      payload: {
        matches: matchObj,
        newMatchesCounter: matches.newMatchesCounter + 1,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_RESTAURANTS',
      // TODO: handle error D:
    });
  }
};
