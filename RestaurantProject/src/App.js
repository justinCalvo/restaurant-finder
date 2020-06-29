import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState();

  // const getData = useCallback(() => {
  //   axios
  //     .get(
  //       'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBNeow3v0H2kxrMOcu-IzY4JvGz8euNG2k',
  //     )
  //     .then(results => console.log(results))
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   getData();
  // });

  return (
    <SafeAreaView>
      <Text>Hello World</Text>
    </SafeAreaView>
  );
};

export default App;
