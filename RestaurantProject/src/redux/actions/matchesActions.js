import { editMatches } from '../../API/editMatches.js';

export const setMatches = (places, details, index, matches, id) => dispatch => {
  try {
    dispatch({
      type: 'RESET_MATCHES_COUNTER',
    });

    if (!places && !index) {
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
      matchObj[places[index]] = [index, 1, 1, false];
    } else {
      matchObj = matches.matches;
      matchObj[places[index]] = [index, 1, 1, false];
    }

    editMatches(id, matches);

    let item,
      newMatches = [],
      next = 0;
    for (item in matchObj) {
      for (let i = 0; i < places.length; i++) {
        if (places[i] === item) {
          newMatches.push({
            formatted_phone_number: details[i].formatted_phone_number,
            opening_hours: details[i].opening_hours,
            photos: details[i].photos,
            reviews: details[i].reviews,
            website: details[i].website,
            formatted_address: details[i].formatted_address,
            name: details[i].name,
            price_level: details[i].price_level,
            rating: details[i].rating,
            user_ratings_total: details[i].user_ratings_total,
            nextStars: next,
          });
          next++;
        }
      }
    }

    dispatch({
      type: 'SUCCESS_MATCHES',
      payload: {
        matches: matchObj,
        displayMatches: newMatches,
        newMatchesCounter: matches.newMatchesCounter + 1,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_places',
      // TODO: handle error D:
    });
  }
};
