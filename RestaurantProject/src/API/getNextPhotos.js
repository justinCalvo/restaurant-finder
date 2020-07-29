export const getNextPhotos = async (
  photoIndex,
  restaurants,
  setRestaurants,
  setPhotoIndex,
  index,
  axios,
  config,
  width,
) => {
  if (restaurants[index].photos[photoIndex + 2].photo_reference) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photoreference=${
          restaurants[index].photos[photoIndex + 2].photo_reference
        }&key=${config.API_KEY}`,
      )
      .then(data => {
        let newData = restaurants;
        newData[index].photos[photoIndex + 2].url = data.config.url;
        setRestaurants(newData);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
