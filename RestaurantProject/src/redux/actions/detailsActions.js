import axios from 'axios';
import config from '../../../config';

export const getDetails = (details, restaurants, index) => async dispatch => {
  try {
    // dispatch({
    //   type: 'RESET_DETAILS',
    //   payload: {
    //     details: [],
    //   },
    // });

    dispatch({
      type: 'AWAITING_DETAILS',
    });

    let newData = details;

    let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
      restaurants[index].place_id
    }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,reviews&key=${
      config.API_KEY
    }`;

    const data = await axios.get(url);

    newData.push(data.data.result);

    dispatch({
      type: 'AWAITING_INITIAL_PHOTOS',
    });

    url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photoreference=${
      newData[0].photos[1].photo_reference
    }&key=${config.API_KEY}`;

    const finalData = await axios.get(url);

    newData[0].photos[1].url = finalData.config.url;

    dispatch({
      type: 'SUCCESS_DETAILS',
      payload: {
        details: newData,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_DETAILS',
      // TODO: handle error D:
    });
  }
};
