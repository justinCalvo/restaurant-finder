import axios from 'axios';
import config from '../../../config';

export const getPlaceIds = (min, max, meters, types) => async dispatch => {
  try {
    dispatch({
      type: 'RESET_PLACE_IDS',
      payload: {
        placeIds: [],
        details: [],
        matches: {},
        displayMatches: [],
      },
    });

    dispatch({
      type: 'AWAITING_PLACE_IDS',
    });

    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?type=${types}&opennow&minprice=${min}&maxprice=${max}&radius=${meters}&key=${
      config.API_KEY
    }`;
    const places = await axios.get(url);

    let placeIdData = [],
      i;
    for (i = 0; i < places.data.results.length; i++) {
      if (places.data.results[i].place_id) {
        placeIdData.push(places.data.results[i].place_id);
      }
    }

    dispatch({
      type: 'SUCCESS_PLACE_IDS',
      payload: {
        placeIds: placeIdData,
        nextPageToken: places.data.next_page_token,
      },
    });

    dispatch({
      type: 'AWAITING_DETAILS',
    });

    url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
      placeIdData[0]
    }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,reviews,rating,user_ratings_total,price_level,formatted_address,name&key=${
      config.API_KEY
    }`;
    const deets = await axios.get(url);

    let newData = [deets.data.result];

    dispatch({
      type: 'AWAITING_INITIAL_PHOTOS',
    });

    url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${
      newData[0].photos[1].width
    }&photoreference=${newData[0].photos[1].photo_reference}&key=${
      config.API_KEY
    }`;

    const initialOneData = await axios.get(url);
    newData[0].photos[1].url = initialOneData.config.url;

    dispatch({
      type: 'SUCCESS_DETAILS',
      payload: {
        details: newData,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_PLACE_IDS',
      // TODO: handle error D:
    });
  }
};
