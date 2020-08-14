import axios from 'axios';
import config from '../../../config';

export const getPhotos = (
  placeDetails,
  index,
  photoIndex,
) => async dispatch => {
  try {
    dispatch({
      type: 'AWAITING_PHOTOS',
    });

    let newData = placeDetails;

    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photoreference=${
      placeDetails[index].photos[photoIndex + 2].photo_reference
    }&key=${config.API_KEY}`;

    // console.log(url);

    const data = await axios.get(url);
    // console.log('GET PHOTOS');
    // console.log(data.config.url);
    newData[index].photos[photoIndex + 2].url = data.config.url;

    dispatch({
      type: 'SUCCESS_PHOTOS',
      payload: {
        photos: newData,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_PHOTOS',
      // TODO: handle error D:
    });
  }
};
