import axios from 'axios';
import config from '../../../config';
import { createSession } from '../../API/createSession';

export const getNextTwenty = (
  placeIds,
  nextPageToken,
  sessionID,
) => async dispatch => {
  try {
    dispatch({
      type: 'AWAITING_NEXT_TWENTY_PLACE_IDS',
    });

    let temp = placeIds;

    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nextPageToken}&key=${
      config.API_KEY
    }`;

    const data = await axios.get(url);
    const currentData = data.data.results;
    const nextNextPageToken = data.data.next_page_token;
    // console.log(data.data);

    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i].place_id) {
        temp.push(currentData[i].place_id);
      }
    }

    await createSession(sessionID, temp);

    dispatch({
      type: 'SUCCESS_NEXT_TWENTY_PLACE_IDS',
      payload: {
        placeIds: temp,
        nextPageToken: nextNextPageToken,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_NEXT_TWENTY_PLACE_IDS',
      // TODO: handle error D:
    });
  }
};
