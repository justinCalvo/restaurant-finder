export const getRestaurants = (
  lat,
  lng,
  config,
  axios,
  setNextPageToken,
  setRestaurants,
) => {
  let url;

  if (lat && lng) {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&opennow&location=${lat},${lng}&radius=8046.72&type=restaurant&opennow&key=${
      config.API_KEY
    }`;
  } else {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&opennow&key=${
      config.API_KEY
    }`;
  }

  axios
    .get(url)
    .then(data => {
      setNextPageToken(data.data.next_page_token);
      getInitialDetails(data.data.results, config, axios, setRestaurants);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getInitialDetails = (results, config, axios, setRestaurants) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
        results[0].place_id
      }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,review&key=${
        config.API_KEY
      }`,
    )
    .then(description => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
            results[1].place_id
          }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,review&key=${
            config.API_KEY
          }`,
        )
        .then(newDescription => {
          for (var key in description.data.result) {
            results[0][key] = description.data.result[key];
          }
          for (var key in newDescription.data.result) {
            results[1][key] = newDescription.data.result[key];
          }
          getInitialPhotos(results, config, axios, setRestaurants);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getInitialPhotos = (results, config, axios, setRestaurants) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
        results[0].photos[1].photo_reference
      }&key=${config.API_KEY}`,
    )
    .then(data00 => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
            results[0].photos[2].photo_reference
          }&key=${config.API_KEY}`,
        )
        .then(data01 => {
          axios
            .get(
              `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                results[1].photos[1].photo_reference
              }&key=${config.API_KEY}`,
            )
            .then(data10 => {
              axios
                .get(
                  `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                    results[1].photos[2].photo_reference
                  }&key=${config.API_KEY}`,
                )
                .then(data11 => {
                  results[0].photos[1].url = data00.config.url;
                  results[0].photos[2].url = data01.config.url;
                  results[1].photos[1].url = data10.config.url;
                  results[1].photos[2].url = data11.config.url;
                  setRestaurants(results);
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
