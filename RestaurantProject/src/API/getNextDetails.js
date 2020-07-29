export const getNext = async (route, axios, index, config, width) => {
  if (route.params.restaurants[index + 2]) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
          route.params.restaurants[index + 2].place_id
        }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,reviews&key=${
          config.API_KEY
        }`,
      )
      .then(description => {
        let newRestaurants = route.params.restaurants;
        for (var key in description.data.result) {
          newRestaurants[index + 2][key] = description.data.result[key];
        }
        getNextPhotos(
          newRestaurants,
          axios,
          index,
          config,
          route.params.setRestaurants,
          width,
        );
        // route.params.setRestaurants(newRestaurants);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const getNextTwenty = (route, axios, index, config) => {
  if (index === 15 || index === 35) {
    let temp = route.params.restaurants;

    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${
          route.params.nextPageToken
        }&key=${config.API_KEY}`,
      )
      .then(data => {
        route.params.setNextPageToken(data.data.next_page_token);
        const currentData = data.data.results;
        for (var i = 0; i < currentData.length; i++) {
          temp.push({
            formatted_phone_number: currentData[i].formatted_phone_number,
            website: currentData[i].website,
            name: currentData[i].name,
            rating: currentData[i].rating,
            price_level: currentData[i].price_level,
            formatted_address: currentData[i].formatted_address,
            place_id: currentData[i].place_id,
            user_ratings_total: currentData[i].user_ratings_total,
          });
        }
        route.params.setRestaurants(temp);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const getNextPhotos = (
  results,
  axios,
  index,
  config,
  setRestaurants,
  width,
) => {
  // console.log(route.params.restaurants[index + 2]);
  // if (route.params.restaurants[index + 2]) {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
        results[index + 2].photos[1].photo_reference
      }&key=${config.API_KEY}`,
    )
    .then(data00 => {
      let w = results[index + 2].photos[2].width;
      let h = results[index + 2].photos[2].height;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photoreference=${
            results[index + 2].photos[2].photo_reference
          }&key=${config.API_KEY}`,
        )
        .then(data01 => {
          results[index + 2].photos[1].url = data00.config.url;
          results[index + 2].photos[2].url = data01.config.url;

          setRestaurants(results);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
  // }
};
