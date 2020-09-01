import axios from 'axios';
import config from '../../../config';

export const getDetails = (
  details,
  restaurants,
  index,
  pIndex,
) => async dispatch => {
  try {
    dispatch({
      type: 'AWAITING_PHOTOS',
    });

    let pData = details,
      url;

    if (pIndex !== undefined && !pData[index].photos[pIndex + 2].url) {
      url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${
        details[index].photos[pIndex + 2].width
      }&photoreference=${
        details[index].photos[pIndex + 2].photo_reference
      }&key=${config.API_KEY}`;
      const data = await axios.get(url);
      pData[index].photos[pIndex + 2].url = data.config.url;
    }

    dispatch({
      type: 'SUCCESS_PHOTOS',
      payload: {
        details: pData,
      },
    });

    dispatch({
      type: 'AWAITING_DETAILS',
    });

    let newData;
    if (restaurants) {
      newData = details;
      url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
        restaurants[index + 1]
      }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,reviews,rating,user_ratings_total,price_level,formatted_address,name&key=${
        config.API_KEY
      }`;

      const deetsData = await axios.get(url);
      newData.push(deetsData.data.result);
    } else {
      newData = pData;
    }

    dispatch({
      type: 'AWAITING_INITIAL_PHOTOS',
    });

    if (restaurants) {
      url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${
        newData[index + 1].photos[1].width
      }&photoreference=${newData[index + 1].photos[1].photo_reference}&key=${
        config.API_KEY
      }`;

      const initialOneData = await axios.get(url);
      newData[index + 1].photos[1].url = initialOneData.config.url;
    }

    dispatch({
      type: 'SUCCESS_DETAILS',
      payload: {
        details: newData,
      },
    });
    // }
  } catch (e) {
    dispatch({
      type: 'REJECTED_DETAILS',
      // TODO: handle error D:
    });
  }
};
