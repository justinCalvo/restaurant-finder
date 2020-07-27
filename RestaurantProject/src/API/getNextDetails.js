export const getNext = (route, axios, index, config) => {
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
        route.params.setRestaurants(newRestaurants);
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
