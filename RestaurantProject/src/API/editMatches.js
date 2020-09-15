import firestore from '@react-native-firebase/firestore';
import { createSession } from './createSession.js';
import { findSession } from './findSession.js';

const db = firestore();

export const editMatches = async function(id, matches) {
  let hour = id.slice(0, 2);
  let data = await findSession(id);
  // console.log(data);

  for (var key in data.place_ids) {
    if (
      matches.matches[key] &&
      matches.matches[key][1] === 1 &&
      matches.matches[key][3] === false
    ) {
      matches.matches[key][3] = true;
      data.place_ids[key]++;
      matches.matches[key][2] = data.place_ids[key];
    }
  }

  db.collection(hour)
    .doc(id)
    .set(data)
    .then(() => {
      console.log(`Session ${id} matches updated!`);
      return data;
    })
    .catch(err => {
      console.log(`Session ${id} matches did not update. Error: ${err}`);
    });

  return data;
};
