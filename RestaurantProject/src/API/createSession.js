import firestore from '@react-native-firebase/firestore';
import { uniqueID } from './makeID.js';
const db = firestore();
export const createSession = async function(id, idArr) {
  let obj = {};
  let iD;
  if (id) {
    iD = id;
  } else {
    iD = uniqueID();
  }
  let results = {};
  results.sessionID = iD;
  for (let i = 0; i < idArr.length; i++) {
    obj[idArr[i]] = 0;
  }
  db.collection(iD.slice(0, 2))
    .doc(iD)
    .set({
      place_ids: obj,
    })
    .then(() => {
      console.log(`Session: ${iD} created!`);
    })
    .catch(() => {
      console.log(`Session: ${iD} failed! YOU SUCK`);
    });
};
