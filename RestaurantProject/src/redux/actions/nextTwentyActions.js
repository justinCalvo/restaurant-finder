import axios from 'axios';
import config from '../../../config';

export const getNextTwenty = (restaurants, nextPageToken) => async dispatch => {
  try {
    dispatch({
      type: 'AWAITING_NEXT_TWENTY_RESTAURANTS',
    });

    let temp = restaurants;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nextPageToken}&key=${
      config.API_KEY
    }`;

    const data = await axios.get(url);
    const currentData = data.data.results;

    for (var i = 0; i < currentData.length; i++) {
      if (currentData[i].place_id) {
        temp.push(currentData[i].place_id);
      }
    }

    dispatch({
      type: 'SUCCESS_NEXT_TWENTY_RESTAURANTS',
      payload: {
        restaurants: temp,
        nextPageToken: data.data.next_page_token,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_NEXT_TWENTY_RESTAURANTS',
      // TODO: handle error D:
    });
  }
};
