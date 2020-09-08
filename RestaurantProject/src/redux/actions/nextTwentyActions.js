import axios from 'axios';
import config from '../../../config';

export const getNextTwenty = (placeIds, nextPageToken) => async dispatch => {
  try {
    dispatch({
      type: 'AWAITING_NEXT_TWENTY_PLACE_IDS',
    });

    let temp = placeIds;

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
      type: 'SUCCESS_NEXT_TWENTY_PLACE_IDS',
      payload: {
        placeIds: temp,
        nextPageToken: data.data.next_page_token,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_NEXT_TWENTY_PLACE_IDS',
      // TODO: handle error D:
    });
  }
};
