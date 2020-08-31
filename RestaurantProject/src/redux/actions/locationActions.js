import axios from 'axios';
import config from '../../../config';

export const getLocation = (city, states, zipcode) => async dispatch => {
  try {
    dispatch({
      type: 'RESET_RESTAURANTS',
      payload: {
        restaurants: [],
        details: [],
        matches: {},
        displayMatches: [],
      },
    });
    dispatch({
      type: 'AWAITING_LOCATION',
    });

    let location = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${states},${zipcode}&key=${
        config.API_KEY
      }`,
    );

    dispatch({
      type: 'AWAITING_RESTAURANTS',
    });

    let lat = location.data.results[0].geometry.location.lat;
    let lng = location.data.results[0].geometry.location.lng;

    let url = '';

    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&opennow&location=${lat},${lng}&radius=16093.44&type=restaurant&opennow&key=${
      config.API_KEY
    }`;

    const restaurants = await axios.get(url);

    dispatch({
      type: 'SUCCESS_RESTAURANTS',
      payload: {
        restaurants: restaurants.data.results,
        nextPageToken: restaurants.data.next_page_token,
      },
    });

    dispatch({
      type: 'AWAITING_DETAILS',
    });

    url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
      restaurants.data.results[0].place_id
    }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,reviews&key=${
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
      type: 'REJECTED_RESTAURANTS',
      // TODO: handle error D:
    });
  }
};
