import axios from 'axios';
import config from '../../../config';

export const getLocation = (city, states, zipcode) => async dispatch => {
  try {
    dispatch({
      type: 'RESET_RESTAURANTS',
      payload: {
        restaurants: [],
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

    let data = await axios.get(url);
    // console.log('GET REQUEST');

    dispatch({
      type: 'SUCCESS_RESTAURANTS',
      payload: {
        restaurants: data.data.results,
        nextPageToken: data.data.next_page_token,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_RESTAURANTS',
      // TODO: handle error D:
    });
  }
};
