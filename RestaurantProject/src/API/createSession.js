import firestore from '@react-native-firebase/firestore';
import { uniqueID } from './makeID.js';
const db = firestore();

export const createSession = async function(id, idArr) {
  let obj = {};
  let iD;
  let time = new Date();
  let hour = time.getUTCHours().toString();

  if (id) {
    iD = id;
  } else {
    iD = uniqueID();
  }
  let results = {};
  results.sessionID = iD;
  results.createdAt = hour;

  for (let i = 0; i < idArr.length; i++) {
    obj[idArr[i]] = 0;
  }

  iD = hour + '-' + iD;

  db.collection(hour)
    .doc(iD)
    .set({
      place_ids: obj,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Session: ${iD} created!`);
    })
    .catch(() => {
      console.log(`Session: ${iD} failed! YOU SUCK`);
    });
};
